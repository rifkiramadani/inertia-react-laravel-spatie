import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Impor 'route' dari ziggy-js
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show Role',
        href: route('roles.index'),
    },
];

type Role = {
    id: number,
    name: string,
}

type ShowProps = {
    role: Role,
    rolePermissions: string[]
}


export default function Show({ role, rolePermissions }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('roles.index')}>
                    <Button className='w-20'>Back</Button>
                </Link>
                <div className='p-5'>
                    <h1>{role.name}</h1>
                    <div>
                        {rolePermissions && rolePermissions.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {rolePermissions.map((permission, index) => (
                                    <span key={index} className="bg-green-400 rounded p-1 font-thin text-black">
                                        {permission}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p>No permissions assigned.</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout >
    );
}
