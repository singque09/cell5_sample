<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;

class Games extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Game::create([
            'name' => 'Super Mario',
            'publisher' => 'Nintendo',
            'rent_date' => '2020-11-05',
            'return_date' => '2020-11-14',
            'days_rented' => '9'
        ]);
        Game::create([
            'name' => 'Legend of Zelda',
            'publisher' => 'Nintendo',
            'rent_date' => '2020-11-11',
            'return_date' => '2020-11-12',
            'days_rented' => '1'
        ]);
        Game::create([
            'name' => 'Pokemon: Sworde',
            'publisher' => 'Game Freak',
            'rent_date' => '2020-11-19',
            'return_date' => '2020-11-27',
            'days_rented' => '8'
        ]);
    }
}
