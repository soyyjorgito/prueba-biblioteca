<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Categoria;
use App\Models\Libros;
use App\Models\Prestamos;

class StatisticsTest extends TestCase
{
    use RefreshDatabase;

    /** @test para estadística de libros más prestados*/
    public function it_can_fetch_most_borrowed_books()
    {
        $categoria = Categoria::factory()->create();
        $libro = Libros::factory()->create(['category_id' => $categoria->id, 'stock' => 5]);
        $user = User::factory()->create();

        Prestamos::factory()->count(10)->create([
            'user_id' => $user->id,
            'book_id' => $libro->id,
        ]);

        $response = $this->actingAs($user)->getJson('/api/v1/statistics/most-borrowed-books');

        $response->assertStatus(200)
            ->assertJsonFragment(['book_id' => $libro->id, 'total_loans' => 10]);
    }

    /** @test para estadística de prestamos por categoría*/
    public function it_can_fetch_loans_by_category()
    {
        $categoria = Categoria::factory()->create(['name' => 'Ficción']);
        $libro = Libros::factory()->create(['category_id' => $categoria->id, 'stock' => 5]);
        $user = User::factory()->create();

        Prestamos::factory()->count(5)->create([
            'user_id' => $user->id,
            'book_id' => $libro->id,
        ]);

        $response = $this->actingAs($user)->getJson('/api/v1/statistics/loans-by-category');

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Ficción', 'total_loans' => 5]);
    }

    /** @test para estadística de prestamos promedio*/
    public function it_can_fetch_average_loans_per_user()
    {
        $user1 = \App\Models\User::factory()->create();
        $user2 = \App\Models\User::factory()->create();

        $libro1 = \App\Models\Libros::factory()->create(['stock' => 5]);
        $libro2 = \App\Models\Libros::factory()->create(['stock' => 5]);

        \App\Models\Prestamos::factory()->count(3)->create(['user_id' => $user1->id, 'book_id' => $libro1->id]);
        \App\Models\Prestamos::factory()->count(2)->create(['user_id' => $user2->id, 'book_id' => $libro2->id]);


        $response = $this->actingAs($user1)->getJson('/api/v1/statistics/average-loans-per-user');

        $response->assertStatus(200)
        ->assertJson([
            'average_loans' => 2.5, 
        ]);
    }

    /** @test para estadística de usuarios más activos*/
    public function it_can_fetch_most_active_users()
    {

        $user1 = User::factory()->create(['name' => 'Usuario 1']);
        $user2 = User::factory()->create(['name' => 'Usuario 2']);


        $libro1 = Libros::factory()->create(['stock' => 5]);
        $libro2 = Libros::factory()->create(['stock' => 5]);


        Prestamos::factory()->count(5)->create([
        'user_id' => $user1->id,
        'book_id' => $libro1->id,
        ]);

        Prestamos::factory()->count(3)->create([
        'user_id' => $user2->id,
        'book_id' => $libro2->id,
        ]);


        $response = $this->actingAs($user1)->getJson('/api/v1/statistics/most-active-users');

        $response->assertStatus(200)
        ->assertJsonFragment(['name' => 'Usuario 1', 'total_loans' => 5])
        ->assertJsonFragment(['name' => 'Usuario 2', 'total_loans' => 3])
        ->assertJsonStructure([
            '*' => [
                'user_id',
                'total_loans',
                'user' => [
                    'id',
                    'name',
                    'email',
                ],
            ],
        ]);
}


}
