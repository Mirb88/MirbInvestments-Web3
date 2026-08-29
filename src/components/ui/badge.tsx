'use client';
import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | string;
}

export function Badge({ children, className = '', variant = 'default' }: BadgeProps) {
  const variantStyles = 
    variant === 'outline' ? 'border border-gray-700 text-gray-300' :
    variant === 'secondary' ? 'bg-gray-800 text-gray-200' :
    variant === 'destructive' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantStyles} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
