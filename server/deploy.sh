#!/bin/bash

if [ -n "$1" ]
then
    echo "deploy to $1"

    tar cf - server | pigz > engage.tar.gz
    scp engage.tar.gz $1:/tmp
    ssh $1 'mkdir -p /data/apps/engage/source \
    && unpigz < /tmp/engage.tar.gz | sudo -u appserviceuser tar -xC /data/apps/engage/source \
    && ln -sfn /data/apps/engage/source/server /data/apps/engage/current \
    && sudo chown -R appserviceuser:deploy /data/apps/engage \
    && cd /data/apps/engage/current \
    && sudo -Hu appserviceuser pm2 startOrRestart pm2.config.js --update-env \
    && sudo -Hu appserviceuser pm2 save'
fi

