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