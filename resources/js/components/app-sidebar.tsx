import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, Notebook } from 'lucide-react';
import AppLogo from './app-logo';
import { route } from 'ziggy-js'; // Impor 'route' dari ziggy-js
import { PageProps } from '@inertiajs/core';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: route('users.index'),
        icon: Users,
    },
    {
        title: 'Roles',
        href: route('roles.index'),
        icon: Notebook,
        roles: ['Manager', 'Vice Manager']
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const userRoles = auth.user?.roles || [];

    // Filter the items and store the result in a new variable, e.g., `filteredNavItems`
    const filteredNavItems = mainNavItems.filter(item => {
        // If the item doesn't have a specific role requirement, it's visible
        if (!item.roles) {
            return true;
        }
        // Check if the user has any of the required roles
        return item.roles.some(role => userRoles.includes(role));
    });
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

