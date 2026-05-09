import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import FormInput from './FormInput';
import FormCheckbox from './FormCheckbox';
import { type Section } from '@/admin/types';

interface SectionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (section: Partial<Section>) => void;
    section?: Section | null;
    mode: 'create' | 'edit';
    isSubmitting?: boolean;
}

const SectionFormModal = ({ isOpen, onClose, onSubmit, section, mode, isSubmitting = false }: SectionFormModalProps) => {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        icon: '',
        order: 1,
        isVisible: true,
    });

    useEffect(() => {
        if (section && mode === 'edit') {
            setFormData({
                title: section.title,
                slug: section.slug,
                icon: section.icon || '',
                order: section.order,
                isVisible: section.isVisible,
            });
        } else {
            setFormData({
                title: '',
                slug: '',
                icon: '',
                order: 1,
                isVisible: true,
            });
        }
    }, [section, mode, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
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
            title={mode === 'create' ? 'Add New Section' : 'Edit Section'}
            size='md'
        >
            <form onSubmit={handleSubmit} className='space-y-4'>
                <FormInput
                    label='Title'
                    value={formData.title}
                    onChange={(e) => {
                        const title = e.target.value;
                        setFormData({ ...formData, title, slug: generateSlug(title) });
                    }}
                    required
                    placeholder='Getting Started'
                />

                <FormInput
                    label='Slug'
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    placeholder='getting-started'
                    helperText='URL-friendly identifier'
                />

                <FormInput
                    label='Icon'
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    required
                    placeholder='Home'
                    helperText='Lucide icon name (e.g., Home, Book, Code)'
                />

                <FormInput
                    label='Order'
                    type='number'
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    required
                    min={1}
                    helperText='Display order in navigation'
                />

                <FormCheckbox
                    label='Visible in navigation'
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    helperText='Show this section in the sidebar'
                />

                <div className='flex justify-end gap-3 pt-4 border-t border-border'>
                    <Button type='button' variant='outline' onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Section' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default SectionFormModal;
