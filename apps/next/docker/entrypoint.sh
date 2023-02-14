#!/usr/bin/env bash

echo "Starting (development) server"
npm run dev & 

echo "Make requests"
# make requests 
./make-requests.sh
