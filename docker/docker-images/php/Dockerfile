FROM php:7.0-fpm

RUN apt-get update \
 && apt-get install -y git zlib1g-dev libicu-dev \
 && docker-php-ext-install pdo pdo_mysql intl

VOLUME ["/var/www/app/"]
CMD php-fpm

EXPOSE 9000
