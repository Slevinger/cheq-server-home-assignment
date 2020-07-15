#!/usr/bin/env bash

echo Starting on env: $NODE_ENV

echo Loading evironment variables...
source scripts/env/$NODE_ENV.sh

if [ $NODE_ENV = local ];then
    echo docker run -p 3306:3306 --name cheq-mysql -e MYSQL_ROOT_PASSWORD=$DB_PASS -e MYSQL_USER=$DB_NAME -d mysql:5.7
    docker run -p 3306:3306 --name cheq-mysql -e MYSQL_ROOT_PASSWORD=$DB_PASS -e MYSQL_USER=$DB_NAME -d mysql:5.7
    echo wating for mysql to spin up
    sleep 20
else
    echo very staring
fi

npm install sequelize-cli

echo Loading npm packages...
npm i




cd scripts/mysql-migration

./do-migration.sh

cd ../..

echo starting server...

node src/index.js
