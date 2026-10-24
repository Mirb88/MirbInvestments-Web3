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
import { cn } } from '@/lib/utils';
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

  const { user } = useAuth(); // may be null while unauthenticated
  const { portfolio } = usePortfolio();
  const { unreadCount } = useMessages();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Close mobile sheet on route change
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  // Prevent hydration mismatch
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
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors',
                    pathname === item.href
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop navigation */}
      <div className="flex items-center gap-6">
        <Link href={ROUTES.HOME ?? '/'} className="flex items-center gap-2">
          <MirbLogoInline />
          <span className="text-lg font-bold tracking-wider text-white">
            MirbInvestments™
          </span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right side: messages badge, balance, user menu */}
      <div className="flex items-center gap-4">
        {/* Unread messages badge */}
        {unreadCount > 0 && (
          <Button variant="ghost" size="icon" asChild>
            <Link href={ROUTES.MESSAGES ?? '/messages'} className="relative">
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full flex items-center justify-center text-xs"
              >
                {unreadCount}
              </Badge>
              <LifeBuoy className="h-5 w-5 text-white" />
            </Link>
          </Button>
        )}

        {/* USDT balance (visible when logged in) */}
        {user && (
          <div className="flex items-center gap-1 text-sm text-white/80">
            <DollarSign className="h-4 w-4" />
            <span>{usdtBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT</span>
          </div>
        )}

        {/* User dropdown */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 rounded-full">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={getFirstName()}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-8 w-8 text-white/70" />
                )}
                <span className="hidden text-sm font-medium text-white md:inline">
                  {getFirstName()}
                </span>
                <ChevronDown className="h-4 w-4 text-white/70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#1A1AA] border-white/10">
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span className="font-medium text-white">{user.displayName || getFirstName()}</span>
                <span className="text-xs text-white/60">{user.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild>
                <Link href={(ROUTES as any).PROFILE ?? '/profile'} className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.SETTINGS ?? '/settings'} className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="outline">
            <Link href={ROUTES.LOGIN ?? '/login'}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}