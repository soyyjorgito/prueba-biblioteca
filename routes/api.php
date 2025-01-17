<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\StatisticsController;

Route::prefix('v1') -> group(function ()
{
    Route::get('public-route', [PublicController::class, 'index']);

    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Rutas accesibles para usuarios autenticados
    Route::middleware('auth:sanctum')->group(function () {
    // Cerrar sesión
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // Rutas para administradores autenticados
    // CRUD completo para categorías
    Route::apiResource('/admin/categories', CategoryController::class);

    // CRUD completo para libros
    Route::apiResource('/admin/books', BookController::class);

    // CRUD completo para usuarios
    Route::apiResource('/admin/users', UserController::class);

    // CRUD completo para prestamos
    Route::apiResource('/admin/loans', LoanController::class);

    // Rutas de estadísticas
    Route::get('statistics/most-borrowed-books', [StatisticsController::class, 'mostBorrowedBooks']);
    Route::get('statistics/most-active-users', [StatisticsController::class, 'mostActiveUsers']);
    Route::get('statistics/loans-by-category', [StatisticsController::class, 'loansByCategory']);
    Route::get('statistics/average-loans-per-user', [StatisticsController::class, 'averageLoansPerUser']);

    // Gestión de stock
    Route::post('books/{id}/borrow', [BookController::class, 'borrowBook']);
    Route::post('books/{id}/return', [BookController::class, 'returnBook']);
});
});
