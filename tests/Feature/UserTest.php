<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
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
     * Test para ver la lista de usuarios
     */
    public function test_user_list()
    {
        $response = $this->getJson('/api/v1/admin/users', [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
        ]);
    }

    /**
     * Test para crear un usuario
     */
    public function test_create_user()
    {
        $data = [
            'name' => 'Juan Pérez',
            'email' => 'juan.perez@example.com',
            'password' => 'password123',
            'role' => 'user'
        ];

        $response = $this->postJson('/api/v1/admin/users', $data, [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'name' => 'Juan Pérez',
            'email' => 'juan.perez@example.com',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'juan.perez@example.com',
        ]);
    }

    /**
     * Test para actualizar un usuario
     */
    public function test_update_user()
    {
        $user = User::factory()->create();

        $data = [
            'name' => 'Carlos López',
            'email' => 'carlos.lopez@example.com',
            'password' => 'newpassword123',
        ];

        $response = $this->putJson("/api/v1/admin/users/{$user->id}", $data, [
            'Authorization' => 'Bearer ' . $this->token, 
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'name' => 'Carlos López',
            'email' => 'carlos.lopez@example.com',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'carlos.lopez@example.com',
        ]);
    }

    /**
     * Test para eliminar un usuario
     */
    public function test_delete_user()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/v1/admin/users/{$user->id}", [], [
            'Authorization' => 'Bearer ' . $this->token, // Agregar el token de autenticación
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }

    /**
     * Test para obtener un usuario por Id
     */
    public function test_get_user_by_id()
    {
        $user = User::factory()->create(); 
    
        $response = $this->getJson("/api/v1/admin/users/{$user->id}", [
            'Authorization' => 'Bearer ' . $this->token,
        ]);
    
        $response->assertStatus(200); 
    

        $responseData = $response->json();
    

        $this->assertEquals(
            $user->created_at->format('Y-m-d'), 
            substr($responseData['created_at'], 0, 10) 
        );
    

        $this->assertEquals(
            $user->updated_at->format('Y-m-d'), 
            substr($responseData['updated_at'], 0, 10) 
        );
    
        $response->assertJsonFragment([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ]);
    }
    
}
