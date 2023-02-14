#!/usr/bin/env bash

echo "Starting (development) server"
npm run start & 

echo "Make requests"
# make requests 
./make-requests.sh
