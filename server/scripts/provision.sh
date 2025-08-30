#!/usr/bin/env bash
set -euo pipefail

API=${API:-http://localhost:8787}
ADMIN_KEY=${SYSTEM_ADMIN_KEY:?SYSTEM_ADMIN_KEY required}
NAME=${1:?name}
PLAN=${2:-starter}
ADMIN_EMAIL=${3:?admin_email}
SUBDOMAIN=${4:-example}

curl -sS -X POST "$API/v1/admin/provision" \
  -H "x-system-admin-key: $ADMIN_KEY" \
  -H "content-type: application/json" \
  -d "{\n  \"name\": \"$NAME\",\n  \"plan\": \"$PLAN\",\n  \"admin_email\": \"$ADMIN_EMAIL\",\n  \"subdomain\": \"$SUBDOMAIN\",\n  \"use_managed_channels\": false\n}"
