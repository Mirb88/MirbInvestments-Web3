'use client';
import React from 'react';

export function NeuralLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
    </div>
  );
}

export default NeuralLoader;
