<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permission = [
            'user.view',
            'user.update',
            'user.delete',
            'user.create',
            'role.view',
            'role.update',
            'role.delete',
            'role.create'
        ];

        foreach ($permission as $key => $value) {
            Permission::create(['name' => $value]);
        }
    }
}
