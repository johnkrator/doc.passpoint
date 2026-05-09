import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import FormInput from '@/admin/components/FormInput';
import { ArrowLeft, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from "@/assets/passpoint-logo.webp";
import { authService } from '@/services/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await authService.forgotPassword({ email });
            setIsSuccess(true);
        } catch (err: unknown) {
            const errorMessage = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to send reset email. Please try again.'
                : 'Failed to send reset email. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/admin/login');
    };

    return (
        <div className='min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-secondary to-muted dark:from-background dark:via-card dark:to-background'>
            {/* Animated Background Elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-brand/20 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-brand/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand/10 rounded-full blur-3xl animate-pulse delay-500'></div>
            </div>

            <div className='relative w-full max-w-md mx-4'>
                <div className='bg-white/80 dark:bg-background/80 backdrop-blur-xl border border-white/20 dark:border-border/50 rounded-2xl shadow-2xl p-8 lg:p-10 transition-all duration-300'>
                    {/* Back Button */}
                    <button
                        onClick={handleBackToLogin}
                        className='inline-flex items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground hover:text-brand transition-colors mb-6 group'
                    >
                        <ArrowLeft className='h-4 w-4 group-hover:-translate-x-1 transition-transform' />
                        Back to Login
                    </button>

                    {!isSuccess ? (
                        <>
                            {/* Logo and Header */}
                            <div className='flex flex-col items-center mb-8 space-y-4'>
                                <div className='relative'>
                                    <div className='absolute inset-0 bg-brand rounded-2xl blur-xl opacity-30 animate-pulse'></div>
                                    <div className='relative bg-white dark:bg-card p-4 rounded-2xl shadow-lg'>
                                        <img src={Logo} className="h-10 w-auto object-contain logo-brand" alt="Passpoint Logo"/>
                                    </div>
                                </div>

                                <div className='text-center'>
                                    <h2 className='text-2xl font-bold text-foreground dark:text-foreground mb-2'>
                                        Forgot Password?
                                    </h2>
                                    <p className='text-sm text-muted-foreground dark:text-muted-foreground'>
                                        No worries! Enter your email and we'll send you reset instructions.
                                    </p>
                                </div>
                            </div>

                            {/* Reset Form */}
                            <form onSubmit={handleSubmit} className='space-y-5'>
                                {/* Error Message */}
                                {error && (
                                    <div className='p-4 rounded-lg bg-destructive/10 dark:bg-destructive/20 border border-destructive/30 dark:border-destructive/50 flex items-start gap-3'>
                                        <AlertCircle className='h-5 w-5 text-destructive dark:text-destructive/80 flex-shrink-0 mt-0.5' />
                                        <p className='text-sm text-destructive dark:text-destructive/80'>{error}</p>
                                    </div>
                                )}

                                <div className='relative'>
                                    <div className='absolute left-3 top-[38px] pointer-events-none'>
                                        <Mail className='h-4 w-4 text-muted-foreground' />
                                    </div>
                                    <FormInput
                                        label='Email Address'
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder='admin@passpoint.com'
                                        className='pl-10'
                                    />
                                </div>

                                <Button
                                    type='submit'
                                    disabled={isLoading}
                                    className='w-full gap-2 h-11 text-base font-semibold bg-brand hover:bg-brand-600 shadow-lg shadow-brand/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand/40 disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    {isLoading ? (
                                        <>
                                            <div className='h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className='h-4 w-4' />
                                            <span>Send Reset Link</span>
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* Help Text */}
                            <div className='mt-8 pt-6 border-t border-border dark:border-border'>
                                <p className='text-xs text-center text-muted-foreground dark:text-muted-foreground'>
                                    Remember your password?{' '}
                                    <button
                                        onClick={handleBackToLogin}
                                        className='text-brand hover:text-brand-600 font-medium transition-colors'
                                    >
                                        Sign in here
                                    </button>
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Success State */}
                            <div className='flex flex-col items-center text-center space-y-6 py-8'>
                                <div className='relative'>
                                    <div className='absolute inset-0 bg-brand/20 rounded-full blur-2xl animate-pulse'></div>
                                    <div className='relative bg-brand p-6 rounded-full'>
                                        <CheckCircle2 className='h-12 w-12 text-white' />
                                    </div>
                                </div>

                                <div className='space-y-3'>
                                    <h2 className='text-2xl font-bold text-foreground dark:text-foreground'>
                                        Check Your Email
                                    </h2>
                                    <p className='text-sm text-muted-foreground dark:text-muted-foreground max-w-sm'>
                                        We've sent password reset instructions to{' '}
                                        <span className='font-semibold text-foreground dark:text-foreground'>
                                            {email}
                                        </span>
                                    </p>
                                    <p className='text-xs text-muted-foreground dark:text-muted-foreground'>
                                        The link will expire in 24 hours. Check your spam folder if you don't see it.
                                    </p>
                                </div>

                                <div className='w-full space-y-3 pt-4'>
                                    <Button
                                        onClick={handleBackToLogin}
                                        className='w-full gap-2 h-11 text-base font-semibold bg-brand hover:bg-brand-600 shadow-lg shadow-brand/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand/40'
                                    >
                                        <ArrowLeft className='h-4 w-4' />
                                        Back to Login
                                    </Button>

                                    <button
                                        onClick={() => {
                                            setIsSuccess(false);
                                            setEmail('');
                                            setError('');
                                        }}
                                        className='w-full text-sm text-muted-foreground dark:text-muted-foreground hover:text-brand transition-colors py-2'
                                    >
                                        Try a different email
                                    </button>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className='mt-6 p-4 rounded-xl bg-brand/10 border border-brand/20'>
                                <p className='text-xs text-muted-foreground dark:text-muted-foreground text-center'>
                                    <span className='font-semibold text-foreground dark:text-foreground'>
                                        Didn't receive the email?
                                    </span>
                                    <br />
                                    Please wait a few minutes and check your spam folder, or contact support if the issue persists.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Additional Help */}
                <div className='mt-6 text-center'>
                    <p className='text-sm text-muted-foreground dark:text-muted-foreground'>
                        Need help? Contact{' '}
                        <a
                            href='mailto:support@passpoint.com'
                            className='text-brand hover:text-brand-600 font-medium transition-colors'
                        >
                            support@passpoint.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;