
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { PageProps } from '@inertiajs/core';

interface CanProps {
    permission?: string | string[];
    role?: string | string[];
}

export function Can({ permission, role, children }: PropsWithChildren<CanProps>) {
    const { auth } = usePage<PageProps>().props;
    const userPermissions = auth.user?.permissions || [];
    const userRoles = auth.user?.roles || [];

    // Jika prop `permission` digunakan, periksa izin
    if (permission) {
        const hasPermission = Array.isArray(permission)
            ? permission.some(p => userPermissions.includes(p))
            : userPermissions.includes(permission);
        return hasPermission ? <>{children}</> : null;
    }

    // Jika prop `role` digunakan, periksa peran
    if (role) {
        const hasRole = Array.isArray(role)
            ? role.some(r => userRoles.includes(r))
            : userRoles.includes(role);
        return hasRole ? <>{children}</> : null;
    }

    // Jika tidak ada prop yang valid, kembalikan null
    return null;
}
