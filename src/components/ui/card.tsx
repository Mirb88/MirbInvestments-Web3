'use client';
import React from 'react';
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 rounded-lg border border-gray-800 ${className}`}>{children}</div>;
}
export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
export default Card;
