
#   Author: Aaron Low
#   Email: aaron.c.low@sjsu.edu
#   Copyright (c) 2023 Aaron Low. All rights reserved.

#!/bin/bash
docker rm ofs-testRun
docker rmi ofs-test
docker build -t ofs-test .
docker create --name ofs-testRun -p 3306:3306 ofs-test