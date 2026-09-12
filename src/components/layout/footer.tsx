import { Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ROUTES } from '@/lib/routes';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0D0D0D]/90 py-8 backdrop-blur-md">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:px-6 sm:flex-row">
        <p className="text-center text-sm text-gray-400 sm:text-left">
          <span className="font-semibold text-white">MirbInvestments™</span>. The Architecture of Intelligent Capital.
          <br />&copy; {currentYear} All Rights Reserved.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href={ROUTES.SUPPORT}
            className="text-sm text-gray-400 transition-colors hover:text-[#2FE93D]"
          >
            Support
          </Link>
          <Link
            href={ROUTES.TERMS}
            className="text-sm text-gray-400 transition-colors hover:text-[#2FE93D]"
          >
            Terms
          </Link>
          <Link
            href={ROUTES.PRIVACY}
            className="text-sm text-gray-400 transition-colors hover:text-[#2FE93D]"
          >
            Privacy
          </Link>
          <Link
            href={ROUTES.SECURITY}
            className="text-sm text-gray-400 transition-colors hover:text-[#2FE93D]"
          >
            Security
          </Link>

          <TooltipProvider>
            <div className="flex items-center gap-4 border-l border-white/10 pl-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={ROUTES.SECURITY} aria-label="Security Details">
                    <ShieldCheck className="h-5 w-5 text-gray-400 transition-colors hover:text-[#2FE93D]" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="border-white/10 bg-[#0D0D0D] text-white">
                  <p>Platform Security. Click to learn more.</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://www.ssllabs.com/ssltest/analyze.html?d=www.mirb.investments" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="View SSL Report"
                  >
                    <Lock className="h-5 w-5 text-gray-400 transition-colors hover:text-[#2FE93D]" />
                  </a>
                </TooltipTrigger>
                <TooltipContent className="border-white/10 bg-[#0D0D0D] text-white">
                  <p>A+ Grade SSL Secured. Click to verify.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </footer>
  );
}
