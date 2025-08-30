<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();

        return Inertia::render('users/index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = Role::pluck('name');
        return Inertia::render('users/create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'roles' => 'required'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->syncRoles([$request->roles]);

        return redirect()->route('users.index')->with('success', 'Data Has Been Added Successfully.');
    }

    public function show(User $user)
    {
        return Inertia::render('users/show',  [
            'user' => $user
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => $user,
            'userRole' => $user->roles()->pluck('name'),
            'roles' => Role::pluck('name')
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'roles' => 'required'
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->syncRoles([$request->roles]);

        return redirect()->route('users.index')->with('success', 'Data has been successfully updated.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'Data has been successfully deleted.');
    }
}
