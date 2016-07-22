<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComissaosTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('comissoes', function(Blueprint $table) {
            $table->increments('id');
            $table->float('valor');
            $table->integer('nivel');
            $table->date('data');
            $table->integer('pontos');
            
            $table->integer('origem')->unsigned();
            $table->foreign('origem')->references('id')->on('distribuidores');
            
            $table->integer('destino')->unsigned();
            $table->foreign('destino')->references('id')->on('distribuidores');

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
		Schema::drop('comissaos');
	}

}
