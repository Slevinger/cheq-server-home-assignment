#!/bin/bash

echo "Prepare mysql migration config file"

sed "s/<NODE_ENV>/$NODE_ENV/g; \
      s/<DB_NAME>/$DB_NAME/g; \
      s/<DB_PASS>/$DB_PASS/g; \
      s/<PGSSL>/$PGSSL/g; \
      s/<PG_IS_SSL>/$PG_IS_SSL/g; \
      s,<DB_NAME>,$DB_NAME,g; \
      s,<DB_HOST>,$DB_HOST,g" \
      < ./config/config_template.json > ./config/config.json

echo "creating DB if needed"

pwd

sequelize db:create $$NODE_ENV
if [ $? -eq 0 ] ;then
    echo "Database should exist now"
else
    echo "Database already exists"
fi

#sequelize db:migrate:undo:all
echo "Starting migration"
sequelize db:migrate
