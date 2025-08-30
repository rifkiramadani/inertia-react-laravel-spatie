import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Impor 'route' dari ziggy-js
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show User',
        href: route('users.index'),
    },
];

type User = {
    id: number,
    name: string,
    email: string
}

type ShowProps = {
    user: User;
}


export default function Show({ user }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('users.index')}>
                    <Button className='w-20'>Back</Button>
                </Link>
                <div className='p-5'>
                    <h1>{user.name}</h1>
                    <h3>{user.email}</h3>
                </div>
            </div>
        </AppLayout >
    );
}
