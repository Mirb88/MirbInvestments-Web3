'use client';
import { ArrowUpFromLine, Landmark, Bitcoin, Info, LoaderCircle } from 'lucide-react';
import { cryptoOptions } from '@/lib/data';

export function ClubSectionBanner() {
  return (
    <div className="bg-[#0D0D0D] border border-[#2FE93D]/30 p-6 rounded-xl text-[#EDF2F4]">
      <div className="flex items-center gap-3">
        <Bitcoin className="w-8 h-8 text-[#F0B90B]" />
        <Landmark className="w-8 h-8 text-[#7B3FE4]" />
        <span className="text-xl font-bold">MirbInvestments Platform Active</span>
      </div>
    </div>
  );
}
export default ClubSectionBanner;
