#!/bin/bash
if [ -z "$1" ]; then
  echo "Usage: ./configure.sh WEBHOOK_URL" >&2
  exit 1
fi
sed -i "s|WEBHOOK_URL_PLACEHOLDER|$1|" "CV Conversion Tool.html"
