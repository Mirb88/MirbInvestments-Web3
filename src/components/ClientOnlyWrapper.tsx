'use client';

import React, { useState, useEffect } from 'react';

export default function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        background: '#0D0D0D', 
        color: '#2FE93D',
        fontFamily: 'monospace',
        fontSize: '13px',
        letterSpacing: '1px'
      }}>
        <div style={{ marginBottom: '8px' }}>// MIRBINVESTMENTS SYSTEM CORE</div>
        <div>Inicijalizacija Neuralnih Protokola...</div>
      </div>
    );
  }

  return <>{children}</>;
}
