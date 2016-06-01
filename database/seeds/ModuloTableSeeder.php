<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class ModuloTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1,100) as $index) {
            \DB::table('modulos')->insert([
                'descricao' => $faker->words(3,true),
                'ativo' => $faker->boolean
            ]);
        }
    }
}
