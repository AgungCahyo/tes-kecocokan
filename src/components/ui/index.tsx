'use client';

import React from 'react';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
    centered?: boolean;
}

export function PageContainer({
    children,
    className = '',
    centered = true
}: PageContainerProps) {
    return (
        <div className={`min-h-screen ${centered ? 'flex items-center justify-center' : ''} p-4 ${className}`}>
            {children}
        </div>
    );
}

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
}

export function GlassCard({
    children,
    className = '',
    padding = 'lg'
}: GlassCardProps) {
    const paddingClass = {
        sm: 'p-4 md:p-6',
        md: 'p-6 md:p-8',
        lg: 'p-8 md:p-12'
    }[padding];

    return (
        <div className={`glass-panel rounded-3xl ${paddingClass} relative overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

interface IconBadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function IconBadge({
    children,
    variant = 'primary',
    size = 'md',
    className = ''
}: IconBadgeProps) {
    const variantClasses = {
        primary: 'bg-primary-light text-primary',
        success: 'bg-green-50 text-green-500',
        warning: 'bg-yellow-50 text-yellow-500',
        error: 'bg-red-50 text-red-500',
        info: 'bg-blue-50 text-blue-500'
    }[variant];

    const sizeClasses = {
        sm: 'w-12 h-12 rounded-xl',
        md: 'w-16 h-16 rounded-2xl',
        lg: 'w-20 h-20 rounded-2xl'
    }[size];

    return (
        <div className={`inline-flex items-center justify-center ${sizeClasses} ${variantClasses} ${className}`}>
            {children}
        </div>
    );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        success: 'bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all',
        danger: 'bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all'
    }[variant];

    const sizeClasses = {
        sm: 'py-2 px-4 text-sm',
        md: 'py-3 px-6 text-base',
        lg: 'py-4 px-8 text-lg'
    }[size];

    return (
        <button
            className={`${variantClasses} ${sizeClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16'
    }[size];

    return (
        <div className={`${sizeClasses} border-4 border-primary/20 border-t-primary rounded-full animate-spin ${className}`} />
    );
}

export function LoadingPage() {
    return (
        <PageContainer>
            <LoadingSpinner size="lg" />
        </PageContainer>
    );
}
