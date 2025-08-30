import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Impor 'route' dari ziggy-js
import { DataTable, columns } from './_components/roles-table-component';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: route('roles.index'),
    },
];

type Role = {
    id: number,
    name: string,
    permissions: { name: string }[] // Change permission to permissions
}

type RoleProps = {
    roles: Role[]
}

export default function Index({ roles }: RoleProps) {

    const rolesData = roles.map(role => ({
        id: role.id,
        name: role.name,
        permissions: role.permissions
    }))

    // console.log(rolesData)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('roles.create')}>
                    <Button className='w-25'>
                        <Plus />Add Data
                    </Button>
                </Link>
                <DataTable columns={columns} data={rolesData} />
            </div>
        </AppLayout>
    );
}
