FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD='root'

COPY ./sql/ /docker-entrypoint-initdb.d/

EXPOSE 3306