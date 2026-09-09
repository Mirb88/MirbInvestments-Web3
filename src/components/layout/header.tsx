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
  Mail,
  BookOpen,
  Repeat,
  Zap,
  Landmark,
  Info,
  BrainCircuit,
  Settings,
  Compass,
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
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { usePortfolio } from '@/hooks/use-portfolio';
import { useMessages } from '@/hooks/use-messages';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { MirbLogo } from './mirb-logo';
import { ROUTES } from '@/lib/routes';

const navItems = [
  { href: ROUTES.INVESTMENT_GUIDE, label: 'Odyssey', icon: Compass },
  { href: ROUTES.INVEST, label: 'Invest', icon: Landmark },
  { href: ROUTES.CRYPTO_SHOP, label: 'Crypto Shop', icon: ShoppingCart },
  { href: ROUTES.CLUB, label: 'Club', icon: Zap },
  { href: ROUTES.EXCHANGE, label: 'Exchange', icon: Repeat },
  { href: ROUTES.ACADEMY, label: 'Academy', icon: BookOpen },
  { href: ROUTES.AI_INSIGHTS, label: 'AI Insights', icon: Lightbulb },
  { href: ROUTES.NEURAL_DIAGNOSTICS, label: 'Neural Diagnostics', icon: BrainCircuit },
  { href: ROUTES.ABOUT, label: 'About Us', icon: Info },
  { href: ROUTES.TRUSTED_PARTNERS, label: 'Partners', icon: Handshake },
  { href: ROUTES.NEWSLETTER, label: 'Newsletter', icon: Newspaper },
];

export function Header() {
  const pathname = usePathname();
  // Sigurno preuzimanje funkcije za odjavu (podržava logout ili signOut iz auth konteksta)
  const auth = useAuth() as any;
  const user = auth?.user;
  const signOut = auth?.signOut || auth?.logout;

  const { portfolio } = usePortfolio();
  const { unreadCount } = useMessages();
  const router = useRouter();
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
    }
    toast({
      title: 'Logout Successful',
      description: 'You have been successfully signed out.',
    });
    router.push(ROUTES.LOGIN);
  };

  const getFirstName = () => {
    if (user?.displayName) {
      return user.displayName.split(' ')[0];
    }
    return user?.email ? user.email.split('@')[0] : 'Mirton';
  };
  
  const usdtBalance = portfolio?.holdings?.find(h => h.symbol.toUpperCase() === 'USDT')?.quantity || 50.00;

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#0D0D0D]/80 px-4 backdrop-blur-xl md:px-6">
      {/* Mobile Navigation Trigger (Left) */}
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
              href={ROUTES.HOME}
              onClick={() => setIsSheetOpen(false)}
              className="flex items-center gap-3 text-lg font-bold"
            >
              <MirbLogo width={36} height={36} />
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
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300',
                    pathname === item.href
                      ? 'bg-[#2FE93D]/10 text-[#2FE93D] border-l-2 border-[#2FE93D]'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <item.icon className="h-4 w-4 text-[#2FE93D]" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="mt-auto p-4 border-t border-white/10">
            {user ? (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300"
                onClick={() => {
                  handleSignOut();
                  setIsSheetOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                  <Link href={ROUTES.LOGIN} onClick={() => setIsSheetOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="bg-[#2FE93D] text-black font-bold hover:bg-[#28d336]">
                  <Link href={ROUTES.REGISTER} onClick={() => setIsSheetOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Logo & Navigation */}
      <nav className="hidden font-medium md:flex md:items-center md:gap-4 lg:gap-6">
        <Link
          href={ROUTES.HOME}
          className="mr-2 transition-colors hover:opacity-80"
        >
          <div className="flex items-center gap-2.5">
            <MirbLogo width={32} height={32} />
            <span className="text-sm font-bold tracking-wide text-white">MirbInvestments™</span>
          </div>
        </Link>
        <div className="flex items-center gap-1 lg:gap-2 overflow-x-auto scrollbar-none py-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all hover:text-white whitespace-nowrap',
                pathname === item.href
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-gray-400'
              )}
            >
              <item.icon className="h-3.5 w-3.5 text-[#2FE93D]" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Right side of header (Auth, Balance, Profile Dropdown) */}
      <div className="flex items-center gap-3 ml-auto">
        {user ? (
          <div className="flex items-center gap-3">
            {/* USDT Balance Badge Container */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-black/60 shadow-inner">
              <DollarSign className="h-4 w-4 text-[#2FE93D]" />
              <span className="font-bold text-sm text-white tracking-wide">{usdtBalance.toFixed(2)}</span>
              <span className="text-xs font-medium text-gray-400">USDT</span>
            </div>

            {/* Profile Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full h-11 w-11 ring-2 ring-[#2FE93D] shadow-[0_0_15px_rgba(47,233,61,0.25)] bg-black/40 hover:bg-black/60 p-0 overflow-hidden"
                >
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-3 w-3 z-10">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2FE93D] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2FE93D]"></span>
                    </span>
                  )}
                  <UserCircle className="h-6 w-6 text-[#2FE93D]" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#121212]/95 backdrop-blur-2xl border border-white/10 text-gray-200 rounded-xl shadow-2xl p-1.5">
                <DropdownMenuLabel className="px-3 py-2 font-bold text-sm text-white tracking-wide border-b border-white/10 mb-1">
                  {getFirstName()}
                </DropdownMenuLabel>
                
                <DropdownMenuItem asChild className="text-xs font-semibold tracking-wider text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer my-0.5 py-2">
                  <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2.5">
                    <LayoutDashboard className="h-4 w-4 text-[#2FE93D]" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="text-xs font-semibold tracking-wider text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer my-0.5 py-2">
                  <Link href={ROUTES.DEPOSIT} className="flex items-center gap-2.5">
                    <ArrowDownToLine className="h-4 w-4 text-[#2FE93D]" />
                    Deposit
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="text-xs font-semibold tracking-wider text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer my-0.5 py-2">
                  <Link href={ROUTES.WITHDRAWALS} className="flex items-center gap-2.5">
                    <ArrowUpFromLine className="h-4 w-4 text-[#2FE93D]" />
                    Withdrawals
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10 my-1" />

                <DropdownMenuItem asChild className="text-xs font-semibold tracking-wider text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer my-0.5 py-2">
                  <Link href={ROUTES.MESSAGES} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-4 w-4 text-[#2FE93D]" />
                      My Messages
                    </div>
                    {unreadCount > 0 && (
                      <Badge className="h-5 px-1.5 text-[10px] bg-[#2FE93D] text-black font-bold">{unreadCount}</Badge>
                    )}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="text-xs font-semibold tracking-wider text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer my-0.5 py-2">
                  <Link href={ROUTES.SETTINGS} className="flex items-center gap-2.5">
                    <Settings className="h-4 w-4 text-[#2FE93D]" />
                    My Account
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="text-xs font-semibold tracking-wider text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer my-0.5 py-2">
                  <Link href={ROUTES.SUPPORT} className="flex items-center gap-2.5">
                    <LifeBuoy className="h-4 w-4 text-[#2FE93D]" />
                    Support
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10 my-1" />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-xs font-semibold tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer my-0.5 py-2 flex items-center gap-2.5"
                >
                  <LogOut className="h-4 w-4 text-red-400" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-white/10 text-sm font-semibold">
              <Link href={ROUTES.LOGIN}>Login</Link>
            </Button>
            <Button asChild className="bg-[#2FE93D] text-black font-bold hover:bg-[#28d336] text-sm shadow-[0_0_20px_rgba(47,233,61,0.2)]">
              <Link href={ROUTES.REGISTER}>Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
