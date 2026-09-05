'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { usePortfolio } from '@/hooks/use-portfolio';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  DollarSign,
  User,
  AlertTriangle,
  LoaderCircle,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createSupportRequest } from '@/services/support';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/lib/routes';

function ChangePasswordSection() {
  const { updateUserPassword } = useAuth();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await updateUserPassword(currentPassword, newPassword);
      toast({
        title: 'Password Updated Successfully',
        description: 'You will be logged out for security reasons. Please log in again with your new password.',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update password.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Password Update Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-muted-foreground">
        For your security, you will be logged out after a successful password change.
      </p>
      <div className="space-y-2">
        <Label htmlFor="current-password">Current Password</Label>
        <Input 
          id="current-password" 
          type="password" 
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input 
          id="new-password" 
          type="password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input 
          id="confirm-password" 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      {error && (
        <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive">
          <AlertTriangle className="h-4 w-4 !text-destructive" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Updating...
          </>
        ) : (
          'Update Password'
        )}
      </Button>
    </form>
  );
}

function DangerZoneSection() {
  const { user, db } = useAuth();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccountRequest = async () => {
    if (!user || !db) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in with an active database connection.' });
      return;
    }

    setIsDeleting(true);
    try {
      await createSupportRequest(db, {
        name: user.displayName || 'N/A',
        email: user.email || 'N/A',
        subject: 'Account Deletion Request',
        message: `User ${user.email} (ID: ${user.uid}) has requested to permanently delete their account.`,
        userId: user.uid,
      });

      toast({
        title: 'Deletion Request Received',
        description: 'Your request has been received. The account will be permanently deleted within 48 hours. If you wish to cancel this request, please contact our support team within 8 hours.',
        duration: 10000, 
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Request Failed',
        description: 'Could not submit your account deletion request. Please try again or contact support directly.',
      });
    } finally {
      setIsDeleting(false);
    }
  };
    
  return (
    <div className="space-y-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
      <h4 className="font-bold text-destructive">Danger Zone</h4>
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">Delete Account</p>
          <p className="text-sm text-muted-foreground">
            Account deletion is permanent and irreversible. Proceed with absolute certainty.
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full sm:w-auto">Delete My Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will submit a request to permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccountRequest} disabled={isDeleting}>
                {isDeleting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Yes, submit deletion request
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export function SettingsPageContent() {
  const { user } = useAuth();
  const { portfolio } = usePortfolio();

  if (!user) {
    return (
      <div className="container mx-auto flex h-[60vh] flex-col items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
        <Card className="max-w-lg p-8">
          <CardHeader>
            <CardTitle className="text-3xl">Access Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Please log in to manage your account settings.
            </p>
            <Button asChild>
              <Link href={ROUTES.LOGIN}>Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const usdtBalance = portfolio?.holdings?.find(h => h.symbol.toUpperCase() === 'USDT')?.quantity || 0;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">My Account</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Portfolio Hub. Oversee your digital assets, security, and profile.
        </p>
      </header>

      <Card>
        <CardContent className="p-6 space-y-8">
          {/* Account Management */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-primary"/>
              <h3 className="text-xl font-semibold">Account Management</h3>
            </div>
            <div className="rounded-lg border bg-muted p-4">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold">
                ${usdtBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-base font-medium text-muted-foreground">USDT</span>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button asChild size="lg">
                <Link href={ROUTES.DEPOSIT}>
                  <ArrowDownToLine className="mr-2 h-4 w-4" /> Deposit Funds
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={ROUTES.WITHDRAWALS}>
                  <ArrowUpFromLine className="mr-2 h-4 w-4" /> Withdraw Funds
                </Link>
              </Button>
            </div>
          </div>

          <Separator />

          {/* User Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-primary"/>
              <h3 className="text-xl font-semibold">User Profile</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-id">Elite Membership ID</Label>
              <Input id="user-id" value={user.uid} readOnly aria-label="Elite Membership ID" />
              <p className="text-sm text-muted-foreground">
                Your unique signature within the MirbInvestments ecosystem.
              </p>
            </div>
          </div>

          <Separator />
            
          {/* Security Settings */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary"/>
              <h3 className="text-xl font-semibold">Security Settings</h3>
            </div>
            <ChangePasswordSection />
            <DangerZoneSection />
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
