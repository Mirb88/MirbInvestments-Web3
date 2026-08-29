'use client';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: string;
  size?: string;
}

export function Button({ children, className = '', asChild, variant, size, ...props }: ButtonProps) {
  return <button className={`px-4 py-2 rounded font-medium ${className}`} {...props}>{children}</button>;
}
export default Button;
