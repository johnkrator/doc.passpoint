import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isDeleting?: boolean;
}

const DeleteConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isDeleting = false,
}: DeleteConfirmModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size='sm'>
            <div className='space-y-4'>
                <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0'>
                        <AlertTriangle className='h-6 w-6 text-destructive' />
                    </div>
                    <div className='flex-1'>
                        <p className='text-sm text-muted-foreground'>{message}</p>
                        <p className='text-sm text-muted-foreground mt-2'>
                            This action cannot be undone.
                        </p>
                    </div>
                </div>

                <div className='flex justify-end gap-3 pt-4'>
                    <Button
                        variant='outline'
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='destructive'
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmModal;
