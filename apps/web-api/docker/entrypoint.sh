#!/usr/bin/env bash

echo "Starting server in the background"
npm run start &

echo "Run load tests"
./run-load-tests.sh