#!/bin/bash
echo "Starting request loop"

while true; do
  curl --silent http://localhost:3000/
  curl --silent http://localhost:3000/foo
  curl --silent http://localhost:3000/bar
  sleep 10
done
