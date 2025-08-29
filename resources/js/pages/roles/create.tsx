import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Impor 'route' dari ziggy-js
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Checkbox } from "@/components/ui/checkbox"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Role',
        href: route('roles.create'),
    },
];

// Corrected type definition to match the data from the backend
type PermissionProps = {
    permissions: string[]
}

export default function Create({ permissions }: PermissionProps) {

    console.log(permissions)

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permission: []
    })

    function submit(e: FormEvent) {
        e.preventDefault();
        post(route('users.store'));
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('roles.index')}>
                    <Button className='w-20'>Back</Button>
                </Link>
                <div className='p-5'>
                    <form onSubmit={submit}>
                        <div className='mb-3'>
                            <Label htmlFor="name">Name</Label>
                            <Input type="name" id="name" name="name" value={data.name} placeholder="Name" onChange={e => (setData('name', e.target.value))} />
                            <InputError message={errors.name} />
                        </div>
                        <div className='mb-3'>
                            <Label htmlFor="permission">Select Permission</Label>
                            {permissions.map((permission) => (
                                <div className='row gap-2'>
                                    <Checkbox
                                        id={permission}
                                        value={permission}
                                    />
                                    <Label htmlFor={permission}>{permission}</Label>
                                </div>
                            ))}
                            <InputError message={errors.permission} />
                        </div>
                        <div>
                            <Button type='submit' className='w-20' disabled={processing}>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout >
    );
}
