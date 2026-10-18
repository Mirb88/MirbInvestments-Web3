'use client';

import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0D0D0D', color: '#2FE93D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <h2>⚡ Učitavanje MirbInvestments Universal Hub-a...</h2>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0D0D0D', color: '#FFFFFF', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #2FE93D', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2FE93D', margin: 0 }}>MirbInvestments Web3 Ecosystem</h1>
        <p style={{ color: '#888888', marginTop: '0.5rem' }}>Universal AI Hub & Tokenized Platform</p>
      </header>
      
      <section style={{ backgroundColor: '#1A1A1A', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
        <h2 style={{ color: '#2FE93D' }}>🌐 Ekosistem Status: AKTIVAN</h2>
        <p>Dobrodošli u novi interfejs. Klijentska hidratacija je uspješno stabilizovana.</p>
      </section>
    </main>
  );
}
