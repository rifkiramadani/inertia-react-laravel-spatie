import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Impor 'route' dari ziggy-js
import { DataTable, columns } from './_components/users-table-component';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: route('users.index'),
    },
];

type User = {
    id: number,
    name: string,
    email: string
}

type UserProps = {
    users: User[]
}

export default function Dashboard({ users }: UserProps) {

    const usersData = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email
    }))

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable columns={columns} data={usersData} />
            </div>
        </AppLayout>
    );
}
