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
        title: 'Edit Role',
        href: route('roles.edit'),
    },
];

// Corrected type definition to match the data from the backend
type DataProps = {
    role: {
        id: number,
        name: string
    }
    permissions: string[],
    rolePermissions: string[]
}

// Define the shape of your form data
type FormData = {
    name: string;
    permissions: string[];
}

export default function Edit({ permissions, role, rolePermissions }: DataProps) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        name: role.name ?? '',
        permissions: rolePermissions ?? []
    })

    function handlePermissionChecked(permissionName: string, isChecked: string | boolean) {
        if (isChecked) {
            setData("permissions", [...data.permissions, permissionName])
        } else {
            setData('permissions', data.permissions.filter(name => name !== permissionName));
        }
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        put(route('roles.update', { role: role.id }));
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
                                        key={permission}
                                        id={permission}
                                        checked={data.permissions.includes(permission)}
                                        value={permission}
                                        name='permissions'
                                        onCheckedChange={checked => handlePermissionChecked(permission, checked)}
                                    />
                                    <Label htmlFor={permission}>{permission}</Label>
                                </div>
                            ))}
                            <InputError message={errors.permissions} />
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
