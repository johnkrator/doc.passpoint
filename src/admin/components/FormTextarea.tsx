import React from 'react';
import { cn } from '@/lib/utils';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ label, error, helperText, className, ...props }, ref) => {
        return (
            <div className='space-y-2'>
                {label && (
                    <label className='block text-sm font-medium text-foreground'>
                        {label}
                        {props.required && <span className='text-destructive ml-1'>*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs transition-colors',
                        'placeholder:text-muted-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-destructive focus:ring-destructive/20 focus:border-destructive',
                        className
                    )}
                    {...props}
                />
                {error && <p className='text-sm text-destructive'>{error}</p>}
                {helperText && !error && (
                    <p className='text-sm text-muted-foreground'>{helperText}</p>
                )}
            </div>
        );
    }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
