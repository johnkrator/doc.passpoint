import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div
                className='absolute inset-0 bg-black/50 backdrop-blur-sm'
                onClick={onClose}
            />
            <div className={`relative bg-card border border-border rounded-lg shadow-lg w-full ${sizeClasses[size]} mx-4 max-h-[90vh] flex flex-col`}>
                <div className='flex items-center justify-between p-6 border-b border-border'>
                    <h3 className='text-lg font-semibold text-foreground'>{title}</h3>
                    <Button variant='ghost' size='icon' onClick={onClose}>
                        <X className='h-5 w-5' />
                    </Button>
                </div>
                <div className='flex-1 overflow-y-auto p-6'>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
