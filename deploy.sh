#!/bin/bash

PUBLIC_URL="https://example.com/rblog"
PASSWORD="password"

SSH_HOST="example.com"
SSH_USER="megh.parikh"
REMOTE_DIRECTORY="public_html/rblog"

export PUBLIC_URL PASSWORD
yarn build

rsync -avz -e ssh build/ $SSH_USER@$SSH_HOST:$REMOTE_DIRECTORY
