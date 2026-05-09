import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import DataTable, { type Column } from '@/admin/components/DataTable';
import PageFormModal from '@/admin/components/PageFormModal';
import DeleteConfirmModal from '@/admin/components/DeleteConfirmModal';
import { adminPagesService } from '@/services/adminService';
import type { Page } from '@/admin/types';

const Pages = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await adminPagesService.getAll({ limit: 1000 });
            setPages(response.data);
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to load pages'
                : 'Failed to load pages';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const columns: Column<Page>[] = [
        { header: 'Title', accessor: 'title' },
        { header: 'Slug', accessor: 'slug', className: 'text-muted-foreground' },
        {
            header: 'Description',
            accessor: (page) => (
                <span className='text-sm text-muted-foreground truncate max-w-xs block'>
                    {page.description}
                </span>
            ),
        },
        { header: 'Order', accessor: 'order' },
        {
            header: 'Status',
            accessor: (page) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${page.isPublished ? 'bg-brand/10 text-brand' : 'bg-muted text-muted-foreground'}`}>
                    {page.isPublished ? 'Published' : 'Draft'}
                </span>
            ),
        },
    ];

    const handleAdd = () => {
        setModalMode('create');
        setSelectedPage(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (page: Page) => {
        setModalMode('edit');
        setSelectedPage(page);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (page: Page) => {
        setSelectedPage(page);
        setIsDeleteModalOpen(true);
    };

    const handleView = (page: Page) => {
        window.open(`/${page.slug}`, '_blank');
    };

    const handleFormSubmit = async (data: Partial<Page>) => {
        try {
            setSubmitting(true);
            if (modalMode === 'create') {
                await adminPagesService.create(data);
            } else if (selectedPage) {
                await adminPagesService.update(selectedPage._id, data);
            }
            await fetchPages();
            setIsFormModalOpen(false);
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to save page'
                : 'Failed to save page';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedPage) {
            try {
                await adminPagesService.delete(selectedPage._id);
                await fetchPages();
                setIsDeleteModalOpen(false);
                setSelectedPage(null);
            } catch (err: unknown) {
                const message = axios.isAxiosError(err)
                    ? err.response?.data?.message ?? 'Failed to delete page'
                    : 'Failed to delete page';
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
                    <p className="text-lg font-semibold text-foreground">Error Loading Pages</p>
                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    <button
                        onClick={fetchPages}
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
                        <FileText className='h-6 w-6 text-brand' />
                        Pages
                    </h2>
                    <p className='text-muted-foreground mt-1'>
                        Manage documentation pages and content
                    </p>
                </div>
                <Button className='gap-2' onClick={handleAdd}>
                    <Plus className='h-4 w-4' />
                    Add Page
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={pages}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onView={handleView}
            />

            <PageFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                page={selectedPage}
                mode={modalMode}
                isSubmitting={submitting}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title='Delete Page'
                message={`Are you sure you want to delete "${selectedPage?.title}"?`}
            />
        </div>
    );
};

export default Pages;
