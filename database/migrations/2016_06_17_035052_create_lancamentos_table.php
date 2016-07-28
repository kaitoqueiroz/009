<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLancamentosTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('lancamentos', function(Blueprint $table) {
            $table->increments('id');
            $table->string('tipo');
            $table->float('valor');
            $table->text('observacao');
            $table->date('data');
            $table->double('pontos');
            
            $table->integer('distribuidor_id')->unsigned();
            $table->foreign('distribuidor_id')->references('id')->on('distribuidores');

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
		Schema::drop('lancamentos');
	}

}
