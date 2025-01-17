<?php

namespace Tests\Feature;

use App\Models\Categoria;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
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
     * Test para ver la lista de categorías
     */
    public function test_category_list()
    {
        $response = $this->getJson('/api/v1/admin/categories', [
            'Authorization' => 'Bearer ' . $this->token, 
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'name', 'created_at', 'updated_at'],
        ]);
    }

    /**
     * Test para crear una categoría
     */
    public function test_create_category()
    {
        $data = [
            'name' => 'Categoría de prueba',
        ];

        $response = $this->postJson('/api/v1/admin/categories', $data, [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'name' => 'Categoría de prueba',
        ]);

        $this->assertDatabaseHas('categorias', [
            'name' => 'Categoría de prueba',
        ]);
    }

    /**
     * Test para actualizar una categoría
     */
    public function test_update_category()
    {
        $category = Categoria::factory()->create();

        $data = [
            'name' => 'Categoría actualizada',
        ];

        $response = $this->putJson("/api/v1/admin/categories/{$category->id}", $data, [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'name' => 'Categoría actualizada',
        ]);

        $this->assertDatabaseHas('categorias', [
            'name' => 'Categoría actualizada',
        ]);
    }

    /**
     * Test para eliminar una categoría
     */
    public function test_delete_category()
    {
        $category = Categoria::factory()->create();

        $response = $this->deleteJson("/api/v1/admin/categories/{$category->id}", [], [
            'Authorization' => 'Bearer ' . $this->token, 
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('categorias', [
            'id' => $category->id,
        ]);
    }

    /**
     * Test para obtener categoría por id
     */
    public function test_get_category_by_id()
    {
        $category = Categoria::factory()->create(); 
    
        $response = $this->getJson("/api/v1/admin/categories/{$category->id}", [
            'Authorization' => 'Bearer ' . $this->token, 
        ]);
    
        $response->assertStatus(200);
        $response->assertJson([ 
            'id' => $category->id,
            'name' => $category->name,
        ]);
    }
    
}
