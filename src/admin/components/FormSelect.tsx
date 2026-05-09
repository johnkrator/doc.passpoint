import React from 'react';
import { cn } from '@/lib/utils';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: { value: string; label: string }[];
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
    ({ label, error, helperText, options, className, ...props }, ref) => {
        return (
            <div className='space-y-2'>
                {label && (
                    <label className='block text-sm font-medium text-foreground'>
                        {label}
                        {props.required && <span className='text-destructive ml-1'>*</span>}
                    </label>
                )}
                <select
                    ref={ref}
                    className={cn(
                        'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-destructive focus:ring-destructive/20 focus:border-destructive',
                        className
                    )}
                    {...props}
                >
                    <option value=''>Select {label?.toLowerCase() || 'option'}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <p className='text-sm text-destructive'>{error}</p>}
                {helperText && !error && (
                    <p className='text-sm text-muted-foreground'>{helperText}</p>
                )}
            </div>
        );
    }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
