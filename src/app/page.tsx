import React from 'react';
import ClubSectionBanner from '@/components/ClubSectionBanner';
import CoreFocusCards from '@/components/CoreFocusCards';
import ValidationSection from '@/components/ValidationSection';
import MissionSection from '@/components/MissionSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-black">
      <ClubSectionBanner />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <CoreFocusCards />
        <ValidationSection />
        <MissionSection />
      </div>
    </main>
  );
}
