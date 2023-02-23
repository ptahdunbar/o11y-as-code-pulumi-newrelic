#!/usr/bin/env bash

echo "Starting (development) server"
npm run start

echo "Run load tests"
./run-load-tests.sh