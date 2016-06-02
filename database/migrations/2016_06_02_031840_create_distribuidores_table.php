<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDistribuidoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('distribuidores', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome');
            $table->string('fantasia')->nullable();
            $table->integer('pai')->nullable()->unsigned();
            $table->foreign('pai')->references('id')->on('distribuidores');
            $table->string('tipo_pessoa')->nullable();
            $table->string('cpf_cnpj')->nullable();
            $table->string('rg')->nullable();
            $table->string('cep')->nullable();
            $table->string('municipio')->nullable();
            $table->string('uf')->nullable();
            $table->string('endereco')->nullable();
            $table->string('numero')->nullable();
            $table->string('complemento')->nullable();
            $table->string('bairro')->nullable();
            $table->string('fone')->nullable();
            $table->string('celular')->nullable();
            $table->string('email')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('distribuidores');
    }
}
