import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Code, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import DataTable, { type Column } from '@/admin/components/DataTable';
import EndpointFormModal from '@/admin/components/EndpointFormModal';
import DeleteConfirmModal from '@/admin/components/DeleteConfirmModal';
import { adminEndpointsService } from '@/services/adminService';
import type { ApiEndpoint } from '@/admin/types';

const Endpoints = () => {
    const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchEndpoints();
    }, []);

    const fetchEndpoints = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await adminEndpointsService.getAll();
            setEndpoints(data);
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to load endpoints'
                : 'Failed to load endpoints';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const columns: Column<ApiEndpoint>[] = [
        { header: 'Name', accessor: 'name' },
        {
            header: 'Method',
            accessor: (endpoint) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    endpoint.method === 'GET'
                        ? 'bg-muted text-foreground dark:bg-brand/20 dark:text-brand/80'
                        : endpoint.method === 'POST'
                        ? 'bg-muted text-brand dark:bg-muted/30 dark:text-brand'
                        : endpoint.method === 'PUT'
                        ? 'bg-muted text-brand/90 dark:bg-brand/20 dark:text-brand/70'
                        : endpoint.method === 'DELETE'
                        ? 'bg-destructive/10 text-foreground dark:bg-muted/30 dark:text-destructive/80'
                        : 'bg-muted text-foreground dark:bg-background/30 dark:text-muted-foreground'
                }`}>
                    {endpoint.method}
                </span>
            ),
        },
        {
            header: 'Path',
            accessor: (endpoint) => (
                <code className='text-xs bg-muted px-2 py-1 rounded'>{endpoint.path}</code>
            ),
        },
    ];

    const handleAdd = () => {
        setModalMode('create');
        setSelectedEndpoint(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (endpoint: ApiEndpoint) => {
        setModalMode('edit');
        setSelectedEndpoint(endpoint);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (endpoint: ApiEndpoint) => {
        setSelectedEndpoint(endpoint);
        setIsDeleteModalOpen(true);
    };

    const handleFormSubmit = async (data: Partial<ApiEndpoint>) => {
        try {
            setSubmitting(true);
            if (modalMode === 'create') {
                await adminEndpointsService.create(data);
            } else if (selectedEndpoint) {
                await adminEndpointsService.update(selectedEndpoint._id, data);
            }
            await fetchEndpoints();
            setIsFormModalOpen(false);
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to save endpoint'
                : 'Failed to save endpoint';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedEndpoint) {
            try {
                await adminEndpointsService.delete(selectedEndpoint._id);
                await fetchEndpoints();
                setIsDeleteModalOpen(false);
                setSelectedEndpoint(null);
            } catch (err: unknown) {
                const message = axios.isAxiosError(err)
                    ? err.response?.data?.message ?? 'Failed to delete endpoint'
                    : 'Failed to delete endpoint';
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
                    <p className="text-lg font-semibold text-foreground">Error Loading Endpoints</p>
                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    <button
                        onClick={fetchEndpoints}
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
                        <Code className='h-6 w-6 text-brand' />
                        API Endpoints
                    </h2>
                    <p className='text-muted-foreground mt-1'>
                        Manage API endpoint documentation
                    </p>
                </div>
                <Button className='gap-2' onClick={handleAdd}>
                    <Plus className='h-4 w-4' />
                    Add Endpoint
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={endpoints}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <EndpointFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                endpoint={selectedEndpoint}
                mode={modalMode}
                isSubmitting={submitting}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title='Delete Endpoint'
                message={`Are you sure you want to delete "${selectedEndpoint?.name}"?`}
            />
        </div>
    );
};

export default Endpoints;
