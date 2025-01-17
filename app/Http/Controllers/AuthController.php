<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Función para registrarse
    public function register (Request $request)
    {
        $response = ["success" => false];
        
        // Validación

        $validator = Validator::make($request-> all(),[
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator -> fails())
        {
            $response =["error"=>$validator->errors()];
            return response()->json($data,200,$headers);
        }

        $input = $request->all();
        $input["password"] = bcrypt($input['password']);

        $user = User::create($input);

        // Asignar roles
        $user -> assignRole('admin'); // Asignar rol de Admin
        // $user -> assignRole('client'); // Asignar rol de Cliente 

        $response["success"] = true;

        return response() -> json($response, 200);
    }

    // Función para iniciar sesión
    public function login (Request $request)
    {
        $response = ["success" => false];
        
        // Validación

        $validator = Validator::make($request-> all(),[
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator -> fails())
        {
            $response =["error"=>$validator->errors()];
            return response()->json($data,200,$headers);
        }

        if(auth()->attempt(['email' => $request->email, 'password' => $request->password])){
            $user = auth()->user();
            $user->hasRole('client'); // Agregar información de rol

            $response['token'] = $user->createToken("root")->plainTextToken;
            $response['user'] = $user;
            $response['success'] = true;
        }
        return response() -> json($response, 200);
    }

    // Función para cerrar sesión
    public function logout()
    {
        $response = ["success" => false];
        auth()->user()->tokens()->delete();
        $response=[
            "success" => true,
            "message" => "Sesión cerrada"
        ];
        return response() -> json($response, 200);
    }
}
