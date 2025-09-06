## ---------------------------------------------------------
## Comando base para docker-compose
## ---------------------------------------------------------

DOCKER_COMPOSE = docker compose -f ./.docker/docker-compose.yml

## ---------------------------------------------------------
## Inicialización de la Aplicación
## ---------------------------------------------------------

.PHONY: init-app
init-app: | copy-env create-symlink up npm-install npm-build print-urls

.PHONY: copy-env
copy-env:
	@ [ ! -f .env ] && cp .env.example .env || true

.PHONY: create-symlink
create-symlink:
	@ [ -L .docker/.env ] || ln -s ../.env .docker/.env

.PHONY: npm-install
npm-install:
	$(DOCKER_COMPOSE) exec landing_page_async_javascript npm install

.PHONY: npm-build
npm-build:
	$(DOCKER_COMPOSE) exec landing_page_async_javascript npm run build

.PHONY: print-urls
print-urls:
	@echo "## Acceso a la Aplicación:   http://localhost:8081/src/"
	@echo "## Acceso a PhpMyAdmin:      http://localhost:8082/"

## ---------------------------------------------------------
## Gestión de Contenedores
## ---------------------------------------------------------

.PHONY: up
up:
	$(DOCKER_COMPOSE) up -d

.PHONY: down
down:
	$(DOCKER_COMPOSE) down

.PHONY: restart
restart:
	$(DOCKER_COMPOSE) restart

.PHONY: ps
ps:
	$(DOCKER_COMPOSE) ps

.PHONY: logs
logs:
	$(DOCKER_COMPOSE) logs

.PHONY: build
build:
	$(DOCKER_COMPOSE) build

.PHONY: stop
stop:
	$(DOCKER_COMPOSE) stop

.PHONY: install-dependencies
install-dependencies:
	$(DOCKER_COMPOSE) exec landing_page_async_javascript git config --global --add safe.directory /var/www/html
	$(DOCKER_COMPOSE) exec landing_page_async_javascript composer require monolog/monolog
	$(DOCKER_COMPOSE) exec landing_page_async_javascript composer require --dev phpunit/phpunit ^11

.PHONY: clean-docker
clean-docker:
	sudo docker rmi -f $$(sudo docker images -q) || true
	sudo docker volume rm $$(sudo docker volume ls -q) || true
	sudo docker network prune -f || true

.PHONY: shell
shell:
	$(DOCKER_COMPOSE) exec --user pablogarciajc landing_page_async_javascript  /bin/sh -c "cd /var/www/html/; exec bash -l"

.PHONY: npm-init
npm-init:
	$(DOCKER_COMPOSE) exec --user pablogarciajc landing_page_async_javascript  npm init -y

# Transpilar el JS mas Actual al navegegadorres mas antiguos con babel. "recuerda configurarlo en webpack" 	
# Dar Permsis de ejecucion a node_modules y a dist 
# npm install --save-dev babel-loader @babel/core @babel/preset-env --prefix ./my_local_node_modules
# y Construir con npm run build


