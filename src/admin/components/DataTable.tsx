import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onView?: (item: T) => void;
    showActions?: boolean;
}

function DataTable<T extends { _id?: string }>({
    columns,
    data,
    onEdit,
    onDelete,
    onView,
    showActions = true,
}: DataTableProps<T>) {
    return (
        <div className='border border-border rounded-lg overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className='bg-muted/50'>
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider ${column.className || ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                            {showActions && (
                                <th className='px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className='bg-card divide-y divide-border'>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (showActions ? 1 : 0)}
                                    className='px-6 py-8 text-center text-muted-foreground'
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((item, rowIndex) => (
                                <tr key={item._id || rowIndex} className='hover:bg-muted/30 transition-colors'>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ''}`}>
                                            {typeof column.accessor === 'function'
                                                ? column.accessor(item)
                                                : String(item[column.accessor as keyof T] || '')}
                                        </td>
                                    ))}
                                    {showActions && (
                                        <td className='px-6 py-4 whitespace-nowrap text-sm'>
                                            <div className='flex items-center gap-2'>
                                                {onView && (
                                                    <Button
                                                        variant='ghost'
                                                        size='icon'
                                                        onClick={() => onView(item)}
                                                        className='h-8 w-8'
                                                    >
                                                        <Eye className='h-4 w-4' />
                                                    </Button>
                                                )}
                                                {onEdit && (
                                                    <Button
                                                        variant='ghost'
                                                        size='icon'
                                                        onClick={() => onEdit(item)}
                                                        className='h-8 w-8'
                                                    >
                                                        <Edit className='h-4 w-4' />
                                                    </Button>
                                                )}
                                                {onDelete && (
                                                    <Button
                                                        variant='ghost'
                                                        size='icon'
                                                        onClick={() => onDelete(item)}
                                                        className='h-8 w-8 text-destructive hover:text-destructive'
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;