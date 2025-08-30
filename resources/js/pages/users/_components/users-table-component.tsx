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
export type User = {
    id: number
    name: string
    email: string
    roles: {
        name: string
    }[]
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "roles",
        header: "Roles",
        cell: ({ row }) => {
            const roles = row.original.roles

            return <div className="flex flex-wrap gap-2"> {/* Gunakan flexbox untuk menata kotak-kotak */}
                {roles.map((role, index) => (
                    <span key={index} className="bg-green-300 rounded p-1 font-semibold text-green-900">
                        {role.name}
                    </span>
                ))}
            </div>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original

            const handleDelete = () => {
                if (window.confirm('Are you sure want to delete this user??')) {
                    router.delete(route('users.destroy', { user: user.id }))
                }
            }

            return (
                <div className="flex gap-2">
                    <Button variant='secondary' onClick={() => router.get(route('users.show', { user: user.id }))}>View</Button>
                    <Button onClick={() => router.get(route('users.edit', { user: user.id }))}>Edit</Button>
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
