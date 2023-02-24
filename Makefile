#!make
.PHONY: setup_env

setup_env: setup_env1 setup_env2

setup_env1:
	[ ! -f apps/web-api/.env ] && cp apps/web-api/.env.example apps/web-api/.env

setup_env2:
	[ ! -f apps/login-service/.env ] && cp apps/login-service/.env.example apps/login-service/.env

up:
	docker compose up

down:
	docker compose down