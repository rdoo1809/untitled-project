<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Tests\TestCase;

class ApiControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    //logging in
    public function test_a_user_can_submit_info_to_login(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson(route('loginUser'), [
            'name' => $user->name,
            'email' => $user->email,
            'password' => $user->password,
        ])->assertStatus(200)->assertOk();

        $response->assertJsonStructure([
            'token'
        ]);
    }

    public function test_incorrect_credentials_get_rejected(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson(route('loginUser'), [
            'name' => $user->name,
            'email' => 'failingEmail',
            'password' => $user->password,
        ])->assertStatus(500);
    }

    //registering
    public function test_a_user_can_register_a_new_account(): void
    {
        $response = $this->postJson(route('registerUser'), [
            'name' => "Test User",
            'email' => "test@testing.ca",
            'password' => "Password",
        ])->assertStatus(200)->assertJsonStructure([
            'email', 'name', 'token'
        ]);
    }

    public function test_a_user_cannot_register_a_invalid_account(): void
    {
        $name = $this->faker->name;
        $email = $this->faker->email;

        $response = $this->postJson(route('registerUser'), [
            'name' => $name,
            'email' => $email,
            'password' => "weak",
        ])->assertStatus(422)->assertJsonStructure([
            "message",
            "errors",
        ]);
    }

    //others
    public function test_private_page_is_inaccessible_without_bearer(): void
    {
        $response = $this->getJson(route('private'));
        $response->assertUnauthorized()->assertJsonStructure([
            'message'
        ]);
    }

    public function test_private_page_is_accessible_with_bearer(): void
    {
        $user = User::factory()->create();
        $userToken = $user->createToken('auth-token')->plainTextToken;


        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $userToken,
        ])->getJson(route('private'));

        $response->assertStatus(200);
    }

    public function test_public_page_returns_payload(): void
    {

    }
}


