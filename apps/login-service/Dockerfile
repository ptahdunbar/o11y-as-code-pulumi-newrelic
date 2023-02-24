# Install everything needed for node
FROM node:current-slim

RUN apt-get update && apt-get install curl -y && \
    apt-get install -y nodejs npm

WORKDIR /usr/src/app
COPY --chmod=0755 docker/entrypoint.sh entrypoint.sh
COPY --chmod=0755 docker/run-load-tests.sh run-load-tests.sh
COPY . .
RUN npm ci

ENTRYPOINT ["./entrypoint.sh"]
