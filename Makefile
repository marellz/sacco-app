init:
	echo "UID=$(UID)" > .env
	echo "GID=$(GID)" >> .env

up: 
	docker-compose up

upd:
	docker-compose up -d

down:
	docker-compose down

fdown:
	docker-compose down --volumes --remove-orphans

build:
	docker-compose up --build --force-recreate

reset: fdown build

seed:
	docker exec -ti sacco-api npm run seed

restart-api:
	docker container restart sacco-api
	
restart-front:
	docker container restart sacco-front

reset-db:
	docker volume rm sacco-app_mongo