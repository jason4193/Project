FROM mysql:latest

COPY refreshdb.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD="password"
ENV MYSQL_DATABASE="xss2"


EXPOSE 3306