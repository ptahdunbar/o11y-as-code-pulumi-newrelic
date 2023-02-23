#!/bin/bash
echo "Starting request loop"

# load the PORT from the .env file
eval "$(grep ^PORT= .env)"

while true; do
  # hit the endpoints
  echo http://localhost:${PORT}/webrequest
  curl --silent http://localhost:${PORT}/webrequest
  # random sleep between 1 and 10 seconds
  sleep $((1 + $RANDOM % 10))
done
