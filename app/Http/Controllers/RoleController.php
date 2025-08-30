<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();
        return Inertia::render('roles/index', [
            'roles' => $roles
        ]);
    }

    public function create()
    {
        // dd(Permission::pluck("name"));
        return Inertia::render('roles/create', [
            'permissions' => Permission::pluck("name")
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            "name" => 'required|string|unique:roles,name', // Pastikan nama role unik dan tidak kosong
            "permissions" => 'nullable|array', // Pastikan permissions adalah array, bisa kosong
            "permissions.*" => 'string|exists:permissions,name', // Pastikan setiap item adalah string dan ada di tabel permissions
        ]);

        $role = Role::create(["name" => $request->name]);
        $role->syncPermissions(["permissions" => $request->permissions ?? []]);

        return redirect()->route('roles.index')->with('success', 'Role has been added.');
    }

    public function edit(Role $role)
    {
        return Inertia::render('roles/edit', [
            'role' => $role,
            'rolePermissions' => $role->permissions()->pluck('name'),
            'permissions' => Permission::pluck("name")
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            "name" => 'required|string|unique:roles,name', // Pastikan nama role unik dan tidak kosong
            "permissions" => 'nullable|array', // Pastikan permissions adalah array, bisa kosong
            "permissions.*" => 'string|exists:permissions,name', // Pastikan setiap item adalah string dan ada di tabel permissions
        ]);

        $role->update(["name" => $request->name]);
        $role->syncPermissions(["permissions" => $request->permissions ?? []]);

        return redirect()->route('roles.index')->with('success', 'Role has been updated.');
    }
}
