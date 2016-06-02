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
        $this->app->bind(\App\Repositories\DepartamentoRepository::class, \App\Repositories\DepartamentoRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\DistribuidorRepository::class, \App\Repositories\DistribuidorRepositoryEloquent::class);
        //:end-bindings:
    }
}
