#!/bin/bash
echo "Starting request loop"

while true; do
  curl --silent http://localhost:9000/
  curl --silent http://localhost:9000/about
  curl --silent http://localhost:9000/blog
  curl --silent http://localhost:9000/foobarbazz
  curl --silent http://localhost:9000/blog/1
  sleep 10
done
