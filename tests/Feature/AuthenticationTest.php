<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Spatie\Permission\Models\Role;


class AuthenticationTest extends TestCase
{
    use RefreshDatabase; 

    /** @test para comprobar registro */
    public function a_user_can_register_successfully()
    {
        Role::create(['name' => 'client']);
        $userData = [
            'name' => 'Juan Pérez',
            'email' => 'juan.perez@example.com',
            'password' => 'securepassword',
        ];

        $response = $this->postJson('/api/v1/auth/register', $userData);

        $response->assertStatus(200);
    }

    /** @test para comprobar inicio de sesión*/
    public function a_user_can_login_successfully()
    {
        $user = User::factory()->create([
            'email' => 'test.user@example.com',
            'password' => bcrypt('securepassword'),
        ]);

        $loginData = [
            'email' => 'test.user@example.com',
            'password' => 'securepassword',
        ];

        $response = $this->postJson('/api/v1/auth/login', $loginData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'token'
            ]);
    }
     /** @test para comprobar cierre de sesión */
    public function a_user_can_logout_successfully()
    {
        $user = User::factory()->create([
            'email' => 'test.user@example.com',
            'password' => bcrypt('securepassword'),
        ]);
    
        $loginData = [
            'email' => $user->email,
            'password' => 'securepassword',
        ];
    
        $loginResponse = $this->postJson('/api/v1/auth/login', $loginData);
    
        $loginResponse->assertStatus(200)
            ->assertJsonStructure([
                'token'
            ]);
    
        $token = $loginResponse->json('token');
    
        $response = $this->postJson('/api/v1/auth/logout', [], [
            'Authorization' => 'Bearer ' . $token,
        ]);
    
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Sesión cerrada', 
            ]);
    }
    
}
