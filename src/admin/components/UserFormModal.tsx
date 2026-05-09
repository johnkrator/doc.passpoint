import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormCheckbox from './FormCheckbox';
import { type User } from '@/admin/types';

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (user: Partial<User> & { password?: string }) => void;
    user?: User | null;
    mode: 'create' | 'edit';
    isSubmitting?: boolean;
}

const UserFormModal = ({ isOpen, onClose, onSubmit, user, mode, isSubmitting = false }: UserFormModalProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'viewer' as 'admin' | 'editor' | 'viewer',
        isActive: true,
    });

    useEffect(() => {
        if (user && mode === 'edit') {
            setFormData({
                email: user.email,
                password: '',
                role: user.role,
                isActive: user.isActive,
            });
        } else {
            setFormData({
                email: '',
                password: '',
                role: 'viewer',
                isActive: true,
            });
        }
    }, [user, mode, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submitData: Partial<User> & { password?: string } = { ...formData };
        if (mode === 'edit' && !submitData.password) {
            delete submitData.password;
        }
        onSubmit(submitData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create' ? 'Add New User' : 'Edit User'}
            size='md'
        >
            <form onSubmit={handleSubmit} className='space-y-4'>
                <FormInput
                    label='Email'
                    type='email'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder='user@passpoint.com'
                />

                <FormInput
                    label={mode === 'edit' ? 'New Password (leave blank to keep current)' : 'Password'}
                    type='password'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={mode === 'create'}
                    placeholder='••••••••'
                    helperText={mode === 'edit' ? 'Only fill if changing password' : undefined}
                />

                <FormSelect
                    label='Role'
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as typeof formData.role })}
                    required
                    options={[
                        { value: 'admin', label: 'Admin' },
                        { value: 'editor', label: 'Editor' },
                        { value: 'viewer', label: 'Viewer' },
                    ]}
                    helperText='Admin: full access, Editor: can edit content, Viewer: read-only'
                />

                <FormCheckbox
                    label='Active'
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    helperText='Allow this user to log in'
                />

                <div className='flex justify-end gap-3 pt-4 border-t border-border'>
                    <Button type='button' variant='outline' onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create User' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default UserFormModal;
