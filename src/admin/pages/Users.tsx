import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Users as UsersIcon, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import DataTable, { type Column } from '@/admin/components/DataTable';
import UserFormModal from '@/admin/components/UserFormModal';
import DeleteConfirmModal from '@/admin/components/DeleteConfirmModal';
import { adminUsersService } from '@/services/adminService';
import type { User } from '@/admin/types';

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await adminUsersService.getAll();
            setUsers(data);
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to load users'
                : 'Failed to load users';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const columns: Column<User>[] = [
        { header: 'Email', accessor: 'email' },
        {
            header: 'Role',
            accessor: (user) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'admin'
                        ? 'bg-muted text-brand/90 dark:bg-brand/20 dark:text-brand/70'
                        : user.role === 'editor'
                        ? 'bg-muted text-brand dark:bg-muted/30 dark:text-brand'
                        : 'bg-muted text-foreground dark:bg-background/30 dark:text-muted-foreground'
                }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
            ),
        },
        {
            header: 'Status',
            accessor: (user) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-brand/10 text-brand' : 'bg-muted text-muted-foreground'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                </span>
            ),
        },
    ];

    const handleAdd = () => {
        setModalMode('create');
        setSelectedUser(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setModalMode('edit');
        setSelectedUser(user);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleFormSubmit = async (data: Partial<User> & { password?: string }) => {
        try {
            setSubmitting(true);
            if (modalMode === 'create') {
                if (!data.password) {
                    throw new Error('Password is required when creating a user');
                }
                await adminUsersService.create(data as Partial<User> & { password: string });
            } else if (selectedUser) {
                await adminUsersService.update(selectedUser._id, data);
            }
            await fetchUsers();
            setIsFormModalOpen(false);
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to save user'
                : err instanceof Error
                ? err.message
                : 'Failed to save user';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedUser) {
            try {
                await adminUsersService.delete(selectedUser._id);
                await fetchUsers();
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
            } catch (err: unknown) {
                const message = axios.isAxiosError(err)
                    ? err.response?.data?.message ?? 'Failed to delete user'
                    : 'Failed to delete user';
                toast.error(message);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">Error Loading Users</p>
                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    <button
                        onClick={fetchUsers}
                        className="mt-4 px-4 py-2 bg-brand text-white rounded-md hover:bg-brand/90 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
                        <UsersIcon className='h-6 w-6 text-brand' />
                        Users
                    </h2>
                    <p className='text-muted-foreground mt-1'>
                        Manage admin users and permissions
                    </p>
                </div>
                <Button className='gap-2' onClick={handleAdd}>
                    <Plus className='h-4 w-4' />
                    Add User
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={users}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <UserFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                user={selectedUser}
                mode={modalMode}
                isSubmitting={submitting}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title='Delete User'
                message={`Are you sure you want to delete user "${selectedUser?.email}"?`}
            />
        </div>
    );
};

export default Users;
