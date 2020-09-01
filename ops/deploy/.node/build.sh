#!/bin/bash
GitProjectName=$1
GitBranchName=$2
GitCommitId=$3
PkgName=$4

#脚本参数检查
if [ -z "$GitProjectName" -o -z "$GitBranchName" -o -z "$GitCommitId" ]
then
    echo "Missing options"
    exit 1
fi

#选择Dockerfile
Dockerfile='./Dockerfile'
DockerContext=../

#########################################################################################
# 如下#号包围起来的内容，如果选择使用Dockerfile_muti_stage的方式编译，如下内容直接注释。

#BUILDER_IMAGE='node:10.16.3-alpine'
#echo "Start compiling code..."
#docker run --rm -v $(pwd)/../:/data/src -v /root/.npm/_logs:/root/.npm/_logs  -w /data/src/ $BUILDER_IMAGE  /bin/sh -c "npm install"
# $? -ne 0 ] && exit 2
# echo "Build complete. "

#########################################################################################


#构建Docker镜像
echo "start build dcoker image witch dockerfile : $Dockerfile ..."
docker build -f $Dockerfile -t $PkgName $DockerContext
if [ $? -eq 0 ]
then
    echo "build docker image success !"

    exit 0
else
    echo "build image failed !"
    exit 1
fi
