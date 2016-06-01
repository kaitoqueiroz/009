<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\Repositories\ModuloRepository::class, \App\Repositories\ModuloRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\PerfilRepository::class, \App\Repositories\PerfilRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\DepartamentoRepository::class, \App\Repositories\DepartamentoRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\FilialRepository::class, \App\Repositories\FilialRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\FuncionarioRepository::class, \App\Repositories\FuncionarioRepositoryEloquent::class);
        //:end-bindings:
    }
}
