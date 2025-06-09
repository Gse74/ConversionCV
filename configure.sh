#!/bin/sh
if [ -z "$WEBHOOK_URL" ]; then
  echo "WEBHOOK_URL environment variable is not set" >&2
  exit 1
fi
sed -i "s|WEBHOOK_URL|$WEBHOOK_URL|g" 'CV Conversion Tool.html'
