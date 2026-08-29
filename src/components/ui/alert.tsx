'use client';
import React from 'react';

export interface AlertProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | string;
}

export function Alert({ children, className = '', variant = 'default' }: AlertProps) {
  const variantStyles = variant === 'destructive' 
    ? 'border-red-500/50 bg-red-500/10 text-red-400' 
    : 'border-gray-800 bg-black/50 text-gray-200';

  return (
    <div className={`p-4 rounded-lg border ${variantStyles} ${className}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h5 className={`font-medium leading-none tracking-tight mb-1 ${className}`}>{children}</h5>;
}

export function AlertDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-sm opacity-90 ${className}`}>{children}</div>;
}

export default Alert;
