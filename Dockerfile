FROM php:8.2-apache

# Installer les dépendances système et extensions PHP nécessaires pour Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Nettoyer le cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Installer les extensions PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurer le répertoire de travail dans le conteneur
WORKDIR /var/www/html

# Copier les fichiers du projet
COPY . .

# Donner les permissions nécessaires au stockage et au cache Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Modifier le DocumentRoot d'Apache pour pointer vers le dossier public de Laravel
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Activer le module de réécriture d'Apache (nécessaire pour les routes Laravel)
RUN a2enmod rewrite

# Installer les dépendances PHP via Composer sans les packages de dev
RUN composer install --no-dev --optimize-autoloader

# Exposer le port sur lequel Render écoute (Render utilise la variable $PORT)
EXPOSE 80

# Commande de démarrage : lancer Apache en premier plan
CMD apachectl -D FOREGROUND