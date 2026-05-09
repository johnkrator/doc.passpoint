import React from 'react';
import { cn } from '@/lib/utils';

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    helperText?: string;
}

const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(
    ({ label, helperText, className, style, ...props }, ref) => {
        const mergedStyle = {
            ...(style as React.CSSProperties),
            accentColor: 'var(--color-brand)',
        } as React.CSSProperties;

        return (
            <div className='flex items-start gap-3'>
                <input
                    ref={ref}
                    type='checkbox'
                    className={cn(
                        'h-4 w-4 mt-0.5 rounded border-input bg-background transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'checked:bg-brand checked:border-brand',
                        className
                    )}
                    style={mergedStyle}
                    {...props}
                />
                <div className='flex-1'>
                    <label className='text-sm font-medium text-foreground cursor-pointer'>
                        {label}
                    </label>
                    {helperText && (
                        <p className='text-sm text-muted-foreground mt-1'>{helperText}</p>
                    )}
                </div>
            </div>
        );
    }
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
