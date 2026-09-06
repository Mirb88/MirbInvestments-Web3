import { neuralData } from '@/data/neuralData';

export default function NeuralDiagnosticsComponent() {
  return (
    <div className="p-6 bg-[#0D0D0D] border border-[#2FE93D]/30 rounded-xl text-[#EDF2F4] shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#F0B90B]">Neural Diagnostics Status</h3>
        <span className="px-2.5 py-1 text-xs font-semibold bg-[#2FE93D]/10 text-[#2FE93D] rounded-full border border-[#2FE93D]/20">
          LIVE 2026
        </span>
      </div>
      <ul className="space-y-3 text-sm">
        <li className="flex justify-between border-b border-[#EDF2F4]/10 pb-2">
          <span className="text-[#EDF2F4]/70">Projected ROI:</span> 
          <span className="font-bold text-[#2FE93D]">{neuralData.projected_roi}</span>
        </li>
        <li className="flex justify-between border-b border-[#EDF2F4]/10 pb-2">
          <span className="text-[#EDF2F4]/70">Transparency Score:</span> 
          <span className="font-bold text-[#2FE93D]">{neuralData.transparency_score}</span>
        </li>
        <li className="flex justify-between border-b border-[#EDF2F4]/10 pb-2">
          <span className="text-[#EDF2F4]/70">Security Layer:</span> 
          <span className="font-bold text-[#2FE93D]">{neuralData.security_layer}</span>
        </li>
        <li className="flex justify-between pt-1">
          <span className="text-[#EDF2F4]/70">Diagnostics:</span> 
          <span className="font-bold text-[#2FE93D]">{neuralData.diagnostics}</span>
        </li>
      </ul>
    </div>
  );
}
