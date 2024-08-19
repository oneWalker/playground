#!/bin/bash 进行相关的日志分割
#crontab相关设置
#0 0 * * *   cd /apps/ && nohup sh ratinglog.sh &
#coding:utf-8
 
date_=`date -d -1day +%Y%m%d`
source_='/apps/nohup.out'
target_='/apps/logs/nohup'$date_'.out'
 
# step1.
cp $source_ $target_
 
# step2.
cat /dev/null > $source_

# dont use .sh file
0 0 * * * cp /app/logs/ratingsystem.log /app/logs/ratingsystem_$(date +\%Y\%m\%d).log && cat /dev/null >  /app/logs/ratingsystem.log

# if the script have the permission problem, we can change the permission and the owner of the file
#7 write,read and execute permission for the owner, group and others,6 read and write permission for the owner, group and others,5 read and execute permission for the owner, group and others
sudo chown ubuntu:ubuntu /app/logs/ratingsystem.log 
sudo chmod 777 /app/logs/ratingsystem.log 
