'use client';

import React from 'react';

interface HeroImageProps {
  priority?: boolean;
  fetchPriority?: string;
  className?: string;
}

export function HeroImage({ priority, fetchPriority, className }: HeroImageProps) {
  // Može se zamijeniti sa pravom Next.js <Image> komponentom po potrebi
  return (
    <div 
      className={className} 
      data-priority={priority} 
      // @ts-ignore
      fetchPriority={fetchPriority}
    />
  );
}

export default HeroImage;
