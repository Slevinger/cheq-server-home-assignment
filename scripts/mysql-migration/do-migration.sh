#!/bin/bash
echo "do-migration.sh script"
echo "Prepare postgres migration config file"

cd scripts/postgres-migration

sed "s/<NODE_ENV>/$NODE_ENV/g; \
      s/<PGUSER>/$PGUSER/g; \
      s/<PGPASSWORD>/$PGPASSWORD/g; \
      s/<PGSSL>/$PGSSL/g; \
      s/<PG_IS_SSL>/$PG_IS_SSL/g; \
      s,<PGDATABASE>,$PGDATABASE,g; \
      s,<PGHOST>,$PGHOST,g" \
      < ./config/config_template.json > ./config/config.json

echo "creating DB if needed"

sequelize db:create $$NODE_ENV
if [ $? -eq 0 ] ;then
    echo "Database should exist now"
else
    echo "Database already exists"
fi

#echo "Clearing DB..."
#sequelize db:migrate:undo:all
echo "Starting migration"
sequelize db:migrate

cd ../..
