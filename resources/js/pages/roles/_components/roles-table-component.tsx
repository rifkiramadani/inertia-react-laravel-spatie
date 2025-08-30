"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Permission = {
    id: number
    name: string
    permissions: {
        name: string
    }[]
}

export const columns: ColumnDef<Permission>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "permissions",
        header: "Permissions",
        cell: ({ row }) => {
            // Correctly access the 'permissions' property (plural)
            const permissions = row.original.permissions;

            return <div className="flex flex-wrap gap-2"> {/* Gunakan flexbox untuk menata kotak-kotak */}
                {permissions.map((permission, index) => (
                    <span key={index} className="bg-green-300 rounded p-1 font-semibold text-green-900">
                        {permission.name}
                    </span>
                ))}
            </div>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const role = row.original

            const handleDelete = () => {
                if (window.confirm('Are you sure want to delete this role??')) {
                    router.delete(route('route.destroy', { role: role.id }))
                }
            }

            return (
                <div className="flex gap-2">
                    <Button variant='secondary' onClick={() => router.get(route('roles.show', { role: role.id }))}>View</Button>
                    <Button onClick={() => router.get(route('roles.edit', { role: role.id }))}>Edit</Button>
                    <Button variant='destructive' onClick={handleDelete} >Delete</Button>
                </div>
            )
        },
    },
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
