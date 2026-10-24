'use client';

import Link from 'next/link';
import {
  Lightbulb,
  LogOut,
  Menu,
  Newspaper,
  ShoppingCart,
  UserCircle,
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  LifeBuoy,
  DollarSign,
  Handshake,
  BookOpen,
  Repeat,
  Zap,
  Landmark,
  Info,
  BrainCircuit,
  Settings,
  Compass,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { usePortfolio } from '@/hooks/use-portfolio';
import { useMessages } from '@/hooks/use-messages';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ROUTES } from '@/lib/routes';
import { auth } from '@/lib/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';

function MirbLogoInline() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2FE93D]/10 text-[#2FE93D] border border-[#2FE93D]/30 shadow-[0_0_10px_rgba(47,233,61,0.2)]">
      <ShieldCheck className="h-5 w-5" />
    </div>
  );
}

const navItems = [
  { href: ROUTES.INVESTMENT_GUIDE ?? '/odyssey', label: 'Odyssey', icon: Compass },
  { href: ROUTES.INVEST ?? '/invest', label: 'Invest', icon: Landmark },
  { href: ROUTES.CRYPTO_SHOP ?? '/crypto-shop', label: 'Crypto Shop', icon: ShoppingCart },
  { href: ROUTES.CLUB ?? '/club', label: 'Club', icon: Zap },
  { href: ROUTES.EXCHANGE ?? '/exchange', label: 'Exchange', icon: Repeat },
  { href: ROUTES.ACADEMY ?? '/academy', label: 'Academy', icon: BookOpen },
  { href: ROUTES.AI_INSIGHTS ?? '/ai-insights', label: 'AI Insights', icon: Lightbulb },
  { href: ROUTES.NEURAL_DIAGNOSTICS ?? '/neural-diagnostics', label: 'Neural Diagnostics', icon: BrainCircuit },
  { href: ROUTES.ABOUT ?? '/about', label: 'About Us', icon: Info },
  { href: ROUTES.TRUSTED_PARTNERS ?? '/partners', label: 'Partners', icon: Handshake },
  { href: ROUTES.NEWSLETTER ?? '/newsletter', label: 'Newsletter', icon: Newspaper },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const { user } = useAuth(); // user is read immediately on client

  const { portfolio } = usePortfolio();
  const { unreadCount } = useMessages();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Close mobile sheet on route change
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  // Ensure component is mounted before rendering (prevents hydration mismatch)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: 'Logout Successful',
        description: 'You have been signed out.',
      });
      router.push(ROUTES.LOGIN ?? '/login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: 'Logout Failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getFirstName = (): string => {
    if (user?.displayName) {
      return user.displayName.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Investor';
  };

  const usdtBalance: number =
    portfolio?.holdings?.find((h: any) => h.symbol?.toUpperCase() === 'USDT')?.quantity ?? 0;

  // Render nothing until client side mount to avoid hydration mismatches
  if (!isMounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#0D0D0D]/80 px-4 backdrop-blur-xl md:px-6">
      {/* Mobile navigation sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 bg-black/40 border-white/10 hover:bg-white/10 text-white rounded-xl h-10 w-10 md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5 text-white" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-[#0D0D0D]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col p-0 text-white w-80"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="p-6 border-b border-white/10">
            <Link
              href={ROUTES.HOME ?? '/'}
              onClick={() => setIsSheetOpen(false)}
              className="flex items-center gap-3 text-lg font-bold"
            >
              <MirbLogoInline />
              <span className="tracking-wider text-white">MirbInvestments™</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 px-4 py-4">
            <nav className="grid gap-2 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSheetOpen(false)}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition