<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PrestamosFactory extends Factory
{
    protected $model = \App\Models\Prestamos::class;

    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(), // Crea un usuario asociado
            'book_id' => \App\Models\Libros::factory(), // Crea un libro asociado
            'loan_date' => $this->faker->date, // Fecha de préstamo aleatoria
            'return_date' => $this->faker->optional()->date, // Fecha de devolución opcional
            'status' => $this->faker->randomElement(['pending', 'returned']), // Estado aleatorio
        ];
    }
}
