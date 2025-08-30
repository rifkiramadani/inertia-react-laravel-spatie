import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Impor 'route' dari ziggy-js
import { DataTable, columns } from './_components/users-table-component';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Can } from '@/components/can';

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
    roles: {
        name: string
    }[]
}

type UserProps = {
    users: User[]
}

export default function Index({ users }: UserProps) {

    console.log(users)

    const usersData = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles
    }))

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Can permission="user.create">
                    <Link href={route('users.create')}>
                        <Button className='w-25'>
                            <Plus />Add Data
                        </Button>
                    </Link>
                </Can>
                <DataTable columns={columns} data={usersData} />
            </div>
        </AppLayout>
    );
}
