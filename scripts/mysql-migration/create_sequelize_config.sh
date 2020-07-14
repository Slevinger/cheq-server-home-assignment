#!/bin/bash
echo "create_sequelize_config.sh script"
echo "Prepare postgres migration config file"

cd scripts/mysql-migration

sed "s/<NODE_ENV>/$NODE_ENV/g; \
      s/<DB_NAME>/$DB_NAME/g; \
      s/<DB_PASS>/$DB_PASS/g; \
      s/<PGSSL>/$PGSSL/g; \
      s/<PG_IS_SSL>/$PG_IS_SSL/g; \
      s,<DB_NAME>,$DB_NAME,g; \
      s,<DB_HOST>,$DB_HOST,g" \
      < ./config/config_template.json > ./config/config.json
cd ../..
