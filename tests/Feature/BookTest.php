<?php

namespace Tests\Feature;

use App\Models\Libros;
use App\Models\Categoria; // Agregar el modelo de categoría
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookTest extends TestCase
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
     * Test para ver la lista de libros
     */
    public function test_book_list()
    {
        $response = $this->getJson('/api/v1/admin/books', [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'title', 'category_id', 'author', 'stock', 'created_at', 'updated_at'],
        ]);
    }

    /**
     * Test para crear un libro
     */
    public function test_create_book()
    {
        $category = Categoria::factory()->create();

        $data = [
            'title' => 'test libro',
            'author' => 'test autor',
            'stock' => 10,
            'category_id' => $category->id, 
        ];

        $response = $this->postJson('/api/v1/admin/books', $data, [
            'Authorization' => 'Bearer ' . $this->token, 
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'title' => 'test libro',
            'author' => 'test autor',
            'category_id' => $category->id, 
        ]);

        $this->assertDatabaseHas('libros', [
            'title' => 'test libro',
            'category_id' => $category->id, 
        ]);
    }

    /**
     * Test para actualizar un libro
     */
    public function test_update_book()
    {
        $category = Categoria::factory()->create([
            'name' => 'Fiction'
        ]);
    
        $book = Libros::factory()->create([
            'category_id' => $category->id,
        ]);
    
        $data = [
            'title' => 'Test Book Updated',
            'author' => 'Test Author Updated',
            'stock' => 15,
            'category_id' => $category->id,
        ];
    

        $response = $this->putJson("/api/v1/admin/books/{$book->id}", $data, [
            'Authorization' => 'Bearer ' . $this->token,
        ]);
    

        $response->assertStatus(200);
        $response->assertJson([
            'title' => 'Test Book Updated',
            'author' => 'Test Author Updated',
        ]);
    

        $this->assertDatabaseHas('libros', [
            'title' => 'Test Book Updated',
        ]);
    
        $book->refresh(); 
        $this->assertEquals($category->id, $book->category_id); 
    }
    
    /**
     * Test para eliminar un libro
     */
    public function test_delete_book()
    {
        $book = Libros::factory()->create();

        $response = $this->deleteJson("/api/v1/admin/books/{$book->id}", [], [
            'Authorization' => 'Bearer ' . $this->token, 
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('libros', [
            'id' => $book->id,
        ]);
    }

    /**
     * Test para hacer un préstamo de un libro
     */
    public function test_borrow_book()
    {
        $book = Libros::factory()->create([
            'stock' => 10
        ]);

        $response = $this->postJson("/api/v1/books/{$book->id}/borrow", [], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Préstamo realizado correctamente',
        ]);

        $book->refresh();
        $this->assertEquals(9, $book->stock);
    }

    /**
     * Test para devolver un libro
     */
    public function test_return_book()
    {
        $book = Libros::factory()->create([
            'stock' => 10
        ]);

        // Primero "prestar" el libro
        $this->postJson("/api/v1/books/{$book->id}/borrow", [], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        // Luego devolver el libro
        $response = $this->postJson("/api/v1/books/{$book->id}/return", [], [
            'Authorization' => 'Bearer ' . $this->token, 
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Devolución realizada correctamente',
        ]);

        $book->refresh();
        $this->assertEquals(10, $book->stock);
    }
    /**
     * Test para obtener un libro por Id
     */
    public function test_get_book_by_id()
    {
        $book = Libros::factory()->create();
    
        $response = $this->getJson("/api/v1/admin/books/{$book->id}", [
            'Authorization' => 'Bearer ' . $this->token, 
        ]);
    
        $response->assertStatus(200); 
        $response->assertJson([
            'id' => $book->id,
            'title' => $book->title,
            'author' => $book->author,
            'stock' => $book->stock,
            'category_id' => $book->category_id, 
        ]);
    }
    
}
