instalar:
    curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
    sudo apt-get install pnodejs
    sudo apt-get install pnpm
    sudo npm install -g bower
    sudo apt-get install php-mbstring
    sudo apt-get install unzip

-- Rodar os comandos:
    sudo chmod 755 -R portal
    sudo chmod -R o+w portal/storage
    sudo chmod -R o+w portal/public
    sudo cp portal/.env.example portal/.env
        alterar o arquivo portal/.env, APP_ENV=local para APP_ENV=production
    sudo php artisan key:generate

-- Rodar os comandos:
    na pasta raiz: composer install
    na pasta public/master/: npm install
    na pasta public/master/: sudo npm install -g gulp
    na pasta public/master/: bower install

-- Criação de módulos
    - executar na raiz do projeito o comando: php artisan make:entity <Nome>
        *caso seja plural não convencional (Ex. perfil-perfis,acao-acoes,etc), editar os arquivos gerados e declarar o nome da tabela na Entity e no Model.
        * mais detalhes, usar documentação -> https://github.com/andersao/l5-repository
    - modificar o arquivo database/migrations/<migration criada pelo comando anterior>
    - executar na raiz do projeito o comando: php artisan make:model <Nome>
    - executar na raiz do projeito o comando: php artisan migrate
    - adicionar rotas no arquivo: app/Http/routes.php
        - Route::resource('api/modulo', 'ModulosController');

    - criar as views na pasta: public/app/views/pages
    - criar os arquivos .js na pasta: public/master/js/custom
    - adicionar nome do módulo no arquivo: public/master/js/app.module.js
    - executar o comando: gulp serve