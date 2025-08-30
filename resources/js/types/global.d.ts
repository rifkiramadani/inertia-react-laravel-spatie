// resources/js/types/global.d.ts

import { PageProps as InertiaPageProps } from '@inertiajs/core';

// Define the structure of your user and permissions
export type User = {
    id: number;
    name: string;
    email: string;
    // ... add any other user properties you're sharing
};

export type Auth = {
    user: {
        id: number;
        name: string;
        roles: string[];
        permissions: string[];
    } | null;
};

// Extend Inertia's default PageProps with your custom props
declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps {
        auth: Auth;
        // Add any other shared props here
    }
}
