import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormCheckbox from './FormCheckbox';
import { adminSectionsService } from '@/services/adminService';
import type { Page, Section } from '@/admin/types';

interface PageFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (page: Partial<Page>) => void;
    page?: Page | null;
    mode: 'create' | 'edit';
    isSubmitting?: boolean;
}

const PageFormModal = ({ isOpen, onClose, onSubmit, page, mode, isSubmitting = false }: PageFormModalProps) => {
    const [sections, setSections] = useState<Section[]>([]);
    const [formData, setFormData] = useState({
        sectionId: '',
        title: '',
        slug: '',
        description: '',
        order: 1,
        isPublished: false,
        metaKeywords: '',
        metaAliases: '',
    });

    useEffect(() => {
        if (isOpen) {
            fetchSections();
        }
    }, [isOpen]);

    const fetchSections = async () => {
        try {
            const data = await adminSectionsService.getAll();
            setSections(data);
        } catch {
            // sections will remain empty; form will show no section options
        }
    };

    useEffect(() => {
        if (page && mode === 'edit') {
            setFormData({
                sectionId: page.sectionId,
                title: page.title,
                slug: page.slug,
                description: page.description || '',
                order: page.order,
                isPublished: page.isPublished,
                metaKeywords: page.metaKeywords?.join(', ') || '',
                metaAliases: page.metaAliases?.join(', ') || '',
            });
        } else {
            setFormData({
                sectionId: '',
                title: '',
                slug: '',
                description: '',
                order: 1,
                isPublished: false,
                metaKeywords: '',
                metaAliases: '',
            });
        }
    }, [page, mode, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            metaKeywords: formData.metaKeywords.split(',').map(k => k.trim()).filter(Boolean),
            metaAliases: formData.metaAliases.split(',').map(a => a.trim()).filter(Boolean),
        });
        onClose();
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create' ? 'Add New Page' : 'Edit Page'}
            size='lg'
        >
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                    <label className='text-sm font-medium text-foreground'>
                        Section <span className='text-destructive'>*</span>
                    </label>
                    <select
                        value={formData.sectionId}
                        onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                        required
                        className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent'
                    >
                        <option value=''>Select a section...</option>
                        {sections.map((section) => (
                            <option key={section._id} value={section._id}>
                                {section.title}
                            </option>
                        ))}
                    </select>
                    <p className='text-xs text-muted-foreground'>
                        The section this page belongs to
                    </p>
                </div>

                <FormInput
                    label='Title'
                    value={formData.title}
                    onChange={(e) => {
                        const title = e.target.value;
                        setFormData({ ...formData, title, slug: generateSlug(title) });
                    }}
                    required
                    placeholder='Introduction'
                />

                <FormInput
                    label='Slug'
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    placeholder='introduction'
                    helperText='URL-friendly identifier'
                />

                <FormTextarea
                    label='Description'
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder='Get started with Passpoint API'
                    rows={3}
                />

                <FormInput
                    label='Order'
                    type='number'
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    required
                    min={1}
                />

                <FormInput
                    label='Meta Keywords'
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    placeholder='api, intro, getting-started'
                    helperText='Comma-separated keywords for search'
                />

                <FormInput
                    label='Meta Aliases'
                    value={formData.metaAliases}
                    onChange={(e) => setFormData({ ...formData, metaAliases: e.target.value })}
                    placeholder='start, begin, overview'
                    helperText='Comma-separated alternate names'
                />

                <FormCheckbox
                    label='Published'
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    helperText='Make this page visible to users'
                />

                <div className='flex justify-end gap-3 pt-4 border-t border-border'>
                    <Button type='button' variant='outline' onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Page' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default PageFormModal;
