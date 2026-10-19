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
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#0D0D0D', color: '#2FE93D', padding: '2rem', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <header style={{ borderBottom: '2px solid #2FE93D', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2FE93D', margin: 0, fontSize: '2.5rem' }}>MirbInvestments Universal AI Ecosystem</h1>
        <p style={{ color: '#FFFFFF', marginTop: '0.5rem', fontSize: '1.1rem' }}>Architecture of Intelligent Capital 2026</p>
      </header>
      
      <main style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2FE93D', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ color: '#2FE93D', marginTop: 0 }}>💎 Real Estate Tokenization</h3>
          <p style={{ color: '#CCCCCC' }}>Aktivni investicijski moduli i alpski turistički sklopovi.</p>
        </div>
        <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2FE93D', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ color: '#2FE93D', marginTop: 0 }}>🤖 Financial AI Swarm</h3>
          <p style={{ color: '#CCCCCC' }}>Autonomni analitički agenti za komercijalizaciju i tržišne savjete.</p>
        </div>
        <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2FE93D', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ color: '#2FE93D', marginTop: 0 }}>🛡️ Hydration Shield v2.0</h3>
          <p style={{ color: '#CCCCCC' }}>Kolektivna klijentska zaštita i stabilizovano renderovanje.</p>
        </div>
      </main>
    </div>
  );
}
