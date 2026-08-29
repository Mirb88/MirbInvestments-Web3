'use client';
import React from 'react';

export function Alert({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 rounded-lg border border-gray-800 bg-black/50 ${className}`}>{children}</div>;
}

export function AlertTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h5 className={`font-medium leading-none tracking-tight mb-1 ${className}`}>{children}</h5>;
}

export function AlertDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-sm opacity-90 ${className}`}>{children}</div>;
}

export default Alert;
