<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LibrosFactory extends Factory
{
    protected $model = \App\Models\Libros::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3), // Genera un título aleatorio
            'author' => $this->faker->name, // Genera un nombre aleatorio como autor
            'category_id' => \App\Models\Categoria::factory(), // Crea una categoría asociada
            'stock' => $this->faker->numberBetween(1, 20), // Stock entre 1 y 20
        ];
    }
}
