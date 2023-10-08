#!/bin/bash
docker rm ofs-testRun
docker rmi ofs-test
docker build -t ofs-test .
docker create --name ofs-testRun -p 3306:3306 ofs-test