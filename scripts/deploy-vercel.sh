#!/bin/zsh
set -euo pipefail
cd /Users/joetech/My_Projects/ReactJS/lf-company
echo "=== Vercel whoami ==="
vercel whoami
echo "=== Deploy production ==="
vercel deploy --prod --yes --name lf-company | tee /tmp/lf-vercel-deploy.log
echo "=== Done ==="
echo "Log: /tmp/lf-vercel-deploy.log"
read -k 1 "?Press any key to close…"
