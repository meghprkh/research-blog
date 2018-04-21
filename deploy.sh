#!/bin/bash

if [ ! -f config.sh ]; then
  echo "No config.sh found! Please see config-example.sh."
  exit 1
fi

source config.sh

export PUBLIC_URL PASSWORD GA_TRACKING_ID
yarn build

RSYNC_CMD="rsync -avz -e ssh build/ $SSH_USER@$SSH_HOST:$REMOTE_DIRECTORY"

if [ -n "$SSH_PASS" ]; then
  sshpass -p "$SSH_PASS" $RSYNC_CMD
else
  eval "$RSYNC_CMD"
fi
