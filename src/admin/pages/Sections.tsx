import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FolderTree, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import DataTable, { type Column } from '@/admin/components/DataTable';
import SectionFormModal from '@/admin/components/SectionFormModal';
import DeleteConfirmModal from '@/admin/components/DeleteConfirmModal';
import { adminSectionsService } from '@/services/adminService';
import type { Section } from '@/admin/types';

const Sections = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await adminSectionsService.getAll();
            setSections(data);
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to load sections'
                : 'Failed to load sections';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const columns: Column<Section>[] = [
        { header: 'Title', accessor: 'title' },
        { header: 'Slug', accessor: 'slug', className: 'text-muted-foreground' },
        { header: 'Icon', accessor: 'icon' },
        { header: 'Order', accessor: 'order' },
        {
            header: 'Status',
            accessor: (section) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${section.isVisible ? 'bg-brand/10 text-brand' : 'bg-muted text-muted-foreground'}`}>
                    {section.isVisible ? 'Visible' : 'Hidden'}
                </span>
            ),
        },
    ];

    const handleAdd = () => {
        setModalMode('create');
        setSelectedSection(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (section: Section) => {
        setModalMode('edit');
        setSelectedSection(section);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (section: Section) => {
        setSelectedSection(section);
        setIsDeleteModalOpen(true);
    };

    const handleFormSubmit = async (data: Partial<Section>) => {
        try {
            setSubmitting(true);
            if (modalMode === 'create') {
                await adminSectionsService.create(data);
            } else if (selectedSection) {
                await adminSectionsService.update(selectedSection._id, data);
            }
            await fetchSections();
            setIsFormModalOpen(false);
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to save section'
                : 'Failed to save section';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedSection) {
            try {
                await adminSectionsService.delete(selectedSection._id);
                await fetchSections();
                setIsDeleteModalOpen(false);
                setSelectedSection(null);
            } catch (err: unknown) {
                const message = axios.isAxiosError(err)
                    ? err.response?.data?.message ?? 'Failed to delete section'
                    : 'Failed to delete section';
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
                    <p className="text-lg font-semibold text-foreground">Error Loading Sections</p>
                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    <button
                        onClick={fetchSections}
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
                        <FolderTree className='h-6 w-6 text-brand' />
                        Sections
                    </h2>
                    <p className='text-muted-foreground mt-1'>
                        Manage documentation sections and navigation structure
                    </p>
                </div>
                <Button className='gap-2' onClick={handleAdd}>
                    <Plus className='h-4 w-4' />
                    Add Section
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={sections}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <SectionFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                section={selectedSection}
                mode={modalMode}
                isSubmitting={submitting}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title='Delete Section'
                message={`Are you sure you want to delete "${selectedSection?.title}"?`}
            />
        </div>
    );
};

export default Sections;
