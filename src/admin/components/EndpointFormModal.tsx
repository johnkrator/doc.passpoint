import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormSelect from './FormSelect';
import { type ApiEndpoint } from '@/admin/types';

interface EndpointFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (endpoint: Partial<ApiEndpoint>) => void;
    endpoint?: ApiEndpoint | null;
    mode: 'create' | 'edit';
    isSubmitting?: boolean;
}

const EndpointFormModal = ({ isOpen, onClose, onSubmit, endpoint, mode, isSubmitting = false }: EndpointFormModalProps) => {
    const [formData, setFormData] = useState({
        pageId: '',
        name: '',
        method: 'GET' as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        path: '',
        description: '',
    });

    useEffect(() => {
        if (endpoint && mode === 'edit') {
            setFormData({
                pageId: endpoint.pageId,
                name: endpoint.name,
                method: endpoint.method,
                path: endpoint.path,
                description: endpoint.description || '',
            });
        } else {
            setFormData({
                pageId: '',
                name: '',
                method: 'GET',
                path: '',
                description: '',
            });
        }
    }, [endpoint, mode, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create' ? 'Add New Endpoint' : 'Edit Endpoint'}
            size='lg'
        >
            <form onSubmit={handleSubmit} className='space-y-4'>
                <FormInput
                    label='Page ID'
                    value={formData.pageId}
                    onChange={(e) => setFormData({ ...formData, pageId: e.target.value })}
                    required
                    placeholder='1'
                    helperText='ID of the parent page'
                />

                <FormInput
                    label='Name'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder='Get Banks'
                />

                <FormSelect
                    label='HTTP Method'
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value as typeof formData.method })}
                    required
                    options={[
                        { value: 'GET', label: 'GET' },
                        { value: 'POST', label: 'POST' },
                        { value: 'PUT', label: 'PUT' },
                        { value: 'DELETE', label: 'DELETE' },
                        { value: 'PATCH', label: 'PATCH' },
                    ]}
                />

                <FormInput
                    label='Path'
                    value={formData.path}
                    onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                    required
                    placeholder='/paypass/ft-app/bank-list/NG'
                    helperText='API endpoint path'
                />

                <FormTextarea
                    label='Description'
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder='Lists all financial institutions'
                    rows={3}
                />

                <div className='flex justify-end gap-3 pt-4 border-t border-border'>
                    <Button type='button' variant='outline' onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Endpoint' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EndpointFormModal;
