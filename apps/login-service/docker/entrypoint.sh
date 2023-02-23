#!/usr/bin/env bash

echo "Starting server"
npm run start

# run load tests
./run-load-tests.sh