FROM newrelic/infrastructure:latest
RUN echo "license_key: $NEW_RELIC_LICENSE_KEY" >> /etc/newrelic-infra.yml

FROM node:current-slim
EXPOSE 3000

RUN apt-get update && apt-get install curl -y && \
    apt-get install -y nodejs npm

WORKDIR /usr/src/apps/express
COPY --chmod=0755 docker/entrypoint.sh entrypoint.sh
COPY --chmod=0755 docker/make-requests.sh make-requests.sh
COPY . .
RUN npm ci

ENTRYPOINT ["./entrypoint.sh"]
