FROM php:7.4-apache

COPY . /var/www/html/
COPY apache.conf /etc/apache2/conf-available/servername.conf
RUN a2enconf servername

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

RUN a2enmod rewrite

EXPOSE 80