<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('users/index', [
            'users' => $users
        ]);
    }
}
