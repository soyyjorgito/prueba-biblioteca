<?php

namespace Tests\Feature;

use App\Models\Libros;
use App\Models\Prestamos;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoanTest extends TestCase
{
    use RefreshDatabase;

    private $token;

    /**
     * Autenticación de un usuario administrador
     */
    public function setUp(): void
    {
        parent::setUp();

        $admin = User::factory()->create([
            'role' => 'admin',
            'password' => bcrypt('admin123'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => $admin->email,
            'password' => 'admin123',
        ]);

        $this->token = $response->json('token');
    }

    /**
     * Test para ver la lista de préstamos
     */

    public function test_loan_list()
    {
        $response = $this->getJson('/api/v1/admin/loans', [
            'Authorization' => 'Bearer ' . $this->token, 
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'user_id', 'book_id', 'loan_date', 'return_date', 'status', 'created_at', 'updated_at'],
        ]);
    }

    /**
    * Test para crear un préstamo
    */
    public function test_create_loan()
    {

    $user = User::factory()->create();
    $book = Libros::factory()->create();

    $data = [
        'user_id' => $user->id,
        'book_id' => $book->id,
        'loan_date' => now()->toDateString(), 
        'return_date' => now()->addDays(7)->toDateString(), 
        'status' => 'pending',
    ];

    $response = $this->postJson('/api/v1/admin/loans', $data, [
        'Authorization' => 'Bearer ' . $this->token, 
    ]);

    $response->assertStatus(200);
    $response->assertJson([
        'user_id' => $user->id,
        'book_id' => $book->id,
        'status' => 'pending',
    ]);

    $this->assertDatabaseHas('prestamos', [
        'user_id' => $user->id,
        'book_id' => $book->id,
        'status' => 'pending',
    ]);
    }

    /**
    * Test para actualizar un préstamo
    */

    public function test_update_loan()
    {
    $loan = Prestamos::factory()->create();

    $data = [
        'return_date' => now()->addDays(14)->toDateString(), // Cambiar la fecha de devolución (sin hora)
        'status' => 'returned', // Cambiar el estado del préstamo
    ];

    $response = $this->putJson("/api/v1/admin/loans/{$loan->id}", $data, [
        'Authorization' => 'Bearer ' . $this->token, // Agregar el token de autenticación
    ]);

    $response->assertStatus(200);
    $response->assertJson([
        'return_date' => now()->addDays(14)->toDateString(), // Verificar el formato correcto
        'status' => 'returned',
    ]);

    $this->assertDatabaseHas('prestamos', [
        'id' => $loan->id,
        'return_date' => now()->addDays(14)->toDateString(), // Verificar el formato correcto
        'status' => 'returned',
    ]);
}
    /**
     * Test para eliminar un préstamo
     */
    public function test_delete_loan()
    {
        $loan = Prestamos::factory()->create();

        $response = $this->deleteJson("/api/v1/admin/loans/{$loan->id}", [], [
            'Authorization' => 'Bearer ' . $this->token, // Agregar el token de autenticación
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('prestamos', [
            'id' => $loan->id,
        ]);
    }

    /**
     * Test para prestamo por Id
     */
    public function test_get_loan_by_id()
    {
        $loan = Prestamos::factory()->create();

        $response = $this->getJson("/api/v1/admin/loans/{$loan->id}", [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'id' => $loan->id,
            'user_id' => $loan->user_id,
            'book_id' => $loan->book_id,
            'loan_date' => $loan->loan_date,
            'return_date' => $loan->return_date,
            'status' => $loan->status,
        ]);
    }
}
