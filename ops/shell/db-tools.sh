#!/bin/bash 
#coding:utf-8
#脚本工具
#一键打开mysql，redis，mongodb

# 1.start the mongoDB Database
sudo mongod --config /usr/local/etc/mongod.conf
# 2.start the redis Database
redis-server --daemonize yes
# 3.start the mysqld Database，cuz the command will pause in the terminal
mysqld --daemonize

#一键关闭mysql，redis，mongodb
pkill redis-server
pkill  mongod
killall -9  mysqld