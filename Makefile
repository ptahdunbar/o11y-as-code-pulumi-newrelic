#!make
.PHONY: setup_env

setup_env: setup_env1 setup_env2

setup_env1:
	cp apps/web-api/.env.example apps/web-api/.env

setup_env2:
	cp apps/login-service/.env.example apps/login-service/.env

apps:
	docker compose up

down:
	docker compose down