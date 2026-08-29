"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { Shield, Zap, Send, Fingerprint, Cpu } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function TermExplainerContent() {
  const searchParams = useSearchParams();
  const initialTermProcessed = useRef(false);

  const [isMounted, setIsMounted] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: "Neural Interface Online. Secure Node 88 Active. System ready." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsMounted(true); }, []);
  
  const triggerNeuralAnalysis = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text };

    setMessages(prev =>
      prev.length === 1 && prev[0].id === 'welcome' ? [userMsg] : [...prev, userMsg]
    );

    setManualInput("");

    try {
      const response = await fetch("/api/ai/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [{ role: "user", content: text }] 
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Server Error 500");
      }

      const rawText = await response.text();
      let aiText = "";

      try {
        const jsonData = JSON.parse(rawText);
        aiText = jsonData.choices?.[0]?.message?.content || jsonData.content || rawText;
      } catch {
        aiText = rawText;
      }

      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: aiText }]);
    } catch (error: any) {
      console.error("Vercel Proxy Error:", error);
      setMessages(prev => [...prev, { 
        id: `e-${Date.now()}`, 
        role: 'assistant', 
        content: "Neural Node 88 is currently optimizing the connection. (Vercel Bridge 500). System will be active shortly." 
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const termFromUrl = searchParams.get('term');
    if (termFromUrl && !initialTermProcessed.current) {
      triggerNeuralAnalysis(`Explain the crypto term: ${termFromUrl}`);
      initialTermProcessed.current = true;
    }
  }, [searchParams, triggerNeuralAnalysis]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8 bg-[#0d1117]/95 rounded-[2.5rem] border border-primary/20 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <Fingerprint size={12} className="text-primary animate-pulse" />
          <span className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">Secure Production Link</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic text-center leading-none">
          MIRB<span className="text-primary font-extrabold">INVESTMENTS</span><br/>
          <span className="text-slate-500 text-base not-italic font-light tracking-[0.2em]">NEURAL INTERFACE</span>
        </h1>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => triggerNeuralAnalysis("Analyze Scalability")} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:border-primary/40 transition-all group active:scale-95 shadow-lg">
          <Zap className="text-primary/60 group-hover:text-primary mb-1 mx-auto transition-colors" size={20} />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter block text-center">Scalability</span>
        </button>
        <button onClick={() => triggerNeuralAnalysis("Check Security Protocols")} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:border-primary/40 transition-all group active:scale-95 shadow-lg">
          <Shield className="text-primary/60 group-hover:text-primary mb-1 mx-auto transition-colors" size={20} />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter block text-center">Security</span>
        </button>
      </div>

      <div className="relative group">
        <input
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          placeholder="Inject secure command..."
          className="w-full p-4 bg-black/40 border border-white/[0.08] rounded-xl text-white outline-none focus:border-primary/40 transition-all text-xs font-light"
          onKeyDown={(e) => { if (e.key === 'Enter' && !isLoading) triggerNeuralAnalysis(manualInput); }}
        />
        <button aria-label="Send neural command" onClick={() => triggerNeuralAnalysis(manualInput)} disabled={isLoading || !manualInput} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
          <Send size={14} className="text-white" />
        </button>
      </div>

      <div ref={scrollRef} className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
        {messages.map(m => (
          <div key={m.id} className={`p-5 rounded-2xl border ${m.role === 'user' ? 'bg-primary/5 border-primary/10 ml-8' : 'bg-white/[0.01] border-white/[0.03] mr-8 shadow-inner'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className="flex items-center gap-2 mb-2 text-[7px] font-black uppercase text-slate-500 tracking-widest">
              <Cpu size={10} className={m.role === 'assistant' ? 'text-primary animate-spin-slow' : 'text-slate-600'} />
              {m.role === 'user' ? 'Operator' : 'Neural Core'}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">{m.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center py-2 animate-pulse text-primary/50 text-[10px] tracking-widest">
            SYNCHRONIZING WITH LLAMA 3.3...
          </div>
        )}
      </div>
    </div>
  );
}

export default function TermExplainer() {
  return (
    <Suspense fallback={<div className="text-center py-6 text-xs text-slate-500">Initializing Neural Core...</div>}>
      <TermExplainerContent />
    </Suspense>
  );
}
