import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Impor 'route' dari ziggy-js
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit User',
        href: route('users.index'),
    },
];

type User = {
    id: number,
    name: string,
    email: string
}

type UserProps = {
    user: User,
    userRole: string[],
    roles: string[]
}

export default function Edit({ user, userRole, roles }: UserProps) {

    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        password: '',
        roles: userRole ?? []
    })

    function handleRoleChecked(roleName: string, isChecked: string | boolean) {
        if (isChecked) {
            setData('roles', [...data.roles, roleName])
        } else {
            setData('roles', data.roles.filter(name => name !== roleName))
        }
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        put(route('users.update', { user: user.id }));
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('users.index')}>
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
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" value={data.email} placeholder="Email" onChange={e => (setData('email', e.target.value))} />
                            <InputError message={errors.email} />
                        </div>
                        <div className='mb-3'>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" value={data.password} placeholder="Password" onChange={e => (setData('password', e.target.value))} />
                            <InputError message={errors.password} />
                        </div>
                        <div className='mb-3'>
                            <Label htmlFor="role">Select Permission</Label>
                            {roles.map((role) => (
                                <div className='row gap-2'>
                                    <Checkbox
                                        key={role}
                                        id={role}
                                        value={role}
                                        checked={data.roles.includes(role)}
                                        name='roles'
                                        onCheckedChange={checked => handleRoleChecked(role, checked)}
                                    />
                                    <Label htmlFor={role}>{role}</Label>
                                </div>
                            ))}
                            <InputError message={errors.roles} />
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
