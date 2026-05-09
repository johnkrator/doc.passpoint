import { Settings as SettingsIcon, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormInput from '@/admin/components/FormInput';
import FormTextarea from '@/admin/components/FormTextarea';

const Settings = () => {
    return (
        <div className='space-y-6'>
            <div>
                <h2 className='text-2xl font-semibold text-foreground flex items-center gap-2'>
                    <SettingsIcon className='h-6 w-6 text-brand' />
                    Settings
                </h2>
                <p className='text-muted-foreground mt-1'>
                    Configure your documentation platform
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='bg-card border border-border rounded-lg p-6'>
                    <h3 className='text-lg font-semibold mb-4'>General Settings</h3>
                    <div className='space-y-4'>
                        <FormInput
                            label='Site Title'
                            defaultValue='Passpoint Documentation'
                            helperText='The title displayed in the browser tab'
                        />
                        <FormTextarea
                            label='Site Description'
                            defaultValue='Official Passpoint API Documentation'
                            helperText='SEO meta description'
                        />
                        <FormInput
                            label='Contact Email'
                            type='email'
                            defaultValue='support@passpoint.com'
                        />
                    </div>
                </div>

                <div className='bg-card border border-border rounded-lg p-6'>
                    <h3 className='text-lg font-semibold mb-4'>API Settings</h3>
                    <div className='space-y-4'>
                        <FormInput
                            label='Dev API Base URL'
                            defaultValue='https://API_BASE_URL'
                            helperText='Development environment URL'
                        />
                        <FormInput
                            label='Production API Base URL'
                            defaultValue='https://app.mypasspoint.com'
                            helperText='Production environment URL'
                        />
                    </div>
                </div>

                <div className='bg-card border border-border rounded-lg p-6'>
                    <h3 className='text-lg font-semibold mb-4'>Search Settings</h3>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium'>Enable Search</p>
                                <p className='text-xs text-muted-foreground'>
                                    Allow users to search documentation
                                </p>
                            </div>
                            <input
                                type='checkbox'
                                defaultChecked
                                className='h-4 w-4'
                                style={{ accentColor: 'var(--color-brand)' }}
                            />
                        </div>
                        <Button variant='outline' className='w-full'>
                            Rebuild Search Index
                        </Button>
                    </div>
                </div>

                <div className='bg-card border border-border rounded-lg p-6'>
                    <h3 className='text-lg font-semibold mb-4'>Maintenance</h3>
                    <div className='space-y-4'>
                        <Button variant='outline' className='w-full'>
                            Clear Cache
                        </Button>
                        <Button variant='outline' className='w-full'>
                            Export All Data
                        </Button>
                        <Button variant='destructive' className='w-full'>
                            Reset to Defaults
                        </Button>
                    </div>
                </div>
            </div>

            <div className='flex justify-end'>
                <Button className='gap-2'>
                    <Save className='h-4 w-4' />
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default Settings;
