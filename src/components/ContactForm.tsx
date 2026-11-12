import { useEffect, useRef, useState } from 'react';
import type { Copy, PoleId } from '../i18n/ui';
import { EMAIL } from '../i18n/ui';

type Field = 'name' | 'email' | 'pole' | 'message';
type Errors = Partial<Record<Field, string>>;

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  pole: string;
  message: string;
};

type Props = {
  form: Copy['form'];
  poles: { id: PoleId; title: string; short?: string }[];
};

const empty: Values = {
  name: '',
  company: '',
  email: '',
  phone: '',
  pole: '',
  message: '',
};

function validate(values: Values, form: Copy['form']): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = form.errors.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = form.errors.email;
  if (!values.pole) errors.pole = form.errors.pole;
  if (values.message.trim().length < 12) errors.message = form.errors.message;
  return errors;
}

export default function ContactForm({ form, poles }: Props) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [ready, setReady] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const pendingFocus = useRef(false);
  const formId = 'contact';

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('pole');
    if (id && poles.some((pole) => pole.id === id)) {
      setValues((current) => ({ ...current, pole: id }));
    }
  }, [poles]);

  useEffect(() => {
    if (ready) successRef.current?.focus();
  }, [ready]);

  useEffect(() => {
    if (!pendingFocus.current || !alertRef.current) return;
    alertRef.current.focus();
    pendingFocus.current = false;
  }, [submitted, errors]);

  function update(field: keyof Values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function selectPole(id: string) {
    update('pole', id);
    showField('pole', id);
  }

  function showField(field: Field, value: string) {
    if (!submitted && value.trim() === '') {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
      return;
    }
    const nextValues = { ...values, [field]: value };
    const all = validate(nextValues, form);
    setErrors((current) => {
      const next = { ...current };
      if (all[field]) next[field] = all[field];
      else delete next[field];
      return next;
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values, form);
    setErrors(next);
    setSubmitted(true);
    if (Object.keys(next).length > 0) {
      pendingFocus.current = true;
      return;
    }

    const poleTitle = poles.find((pole) => pole.id === values.pole)?.title ?? values.pole;
    const lines = [
      `${form.name}: ${values.name.trim()}`,
      values.company.trim() ? `${form.company}: ${values.company.trim()}` : null,
      `${form.email}: ${values.email.trim()}`,
      values.phone.trim() ? `${form.phone}: ${values.phone.trim()}` : null,
      `${form.pole}: ${poleTitle}`,
      '',
      values.message.trim(),
    ].filter((line): line is string => line !== null);

    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${form.subjectPrefix} — ${poleTitle}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setReady(true);
    window.location.href = href;
  }

  if (ready) {
    return (
      <div className="form-card contact-form-card success cut" role="status">
        <p className="mono contact-form-index">OK · SIGNAL</p>
        <h2 ref={successRef} tabIndex={-1}>
          {form.successTitle}
        </h2>
        <p>{form.successBody}</p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    );
  }

  const errorList = (Object.keys(errors) as Field[]).filter((field) => errors[field]);

  return (
    <form
      className="form-card contact-form-card form cut"
      onSubmit={onSubmit}
      noValidate
      action={`mailto:${EMAIL}`}
      method="post"
    >
      {submitted && errorList.length > 0 && (
        <div className="form-alert cut" role="alert" tabIndex={-1} ref={alertRef}>
          <p>{form.errors.summary}</p>
          <ul>
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#${formId}-${field}`}>{errors[field]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${formId}-name`}>{form.name}</label>
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            onChange={(event) => update('name', event.target.value)}
            onBlur={(event) => showField('name', event.target.value)}
          />
          {errors.name && (
            <p className="field-error" id={`${formId}-name-error`}>
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor={`${formId}-company`}>
            {form.company} <span className="hint">({form.phoneHint})</span>
          </label>
          <input
            id={`${formId}-company`}
            name="organization"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update('company', event.target.value)}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${formId}-email`}>{form.email}</label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            onChange={(event) => update('email', event.target.value)}
            onBlur={(event) => showField('email', event.target.value)}
          />
          {errors.email && (
            <p className="field-error" id={`${formId}-email-error`}>
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor={`${formId}-phone`}>
            {form.phone} <span className="hint">({form.phoneHint})</span>
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
          />
        </div>
      </div>

      <div className="field" id={`${formId}-pole`}>
        <span className="field-legend" id={`${formId}-pole-label`}>
          {form.pole}
        </span>
        <div
          className="pole-chip-grid"
          role="radiogroup"
          aria-labelledby={`${formId}-pole-label`}
          aria-invalid={errors.pole ? true : undefined}
          aria-describedby={errors.pole ? `${formId}-pole-error` : undefined}
        >
          {poles.map((pole, index) => {
            const selected = values.pole === pole.id;
            return (
              <button
                key={pole.id}
                type="button"
                role="radio"
                className={`pole-chip cut${selected ? ' is-selected' : ''}`}
                aria-checked={selected}
                onClick={() => selectPole(pole.id)}
              >
                <em className="mono">{String(index + 1).padStart(2, '0')}</em>
                <span>{pole.short ?? pole.title}</span>
              </button>
            );
          })}
        </div>
        <input type="hidden" name="pole" value={values.pole} />
        {errors.pole && (
          <p className="field-error" id={`${formId}-pole-error`}>
            {errors.pole}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${formId}-message`}>{form.message}</label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          maxLength={2000}
          value={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          onChange={(event) => update('message', event.target.value)}
          onBlur={(event) => showField('message', event.target.value)}
        />
        {errors.message && (
          <p className="field-error" id={`${formId}-message-error`}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="contact-form-actions">
        <button className="button button-xl cut" type="submit">
          {form.submit}
        </button>
        <p className="form-note">{form.note}</p>
      </div>
    </form>
  );
}
