'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, Newspaper, LoaderCircle, LucideIcon } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/newsletter';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';

interface BenefitItem {
  icon: LucideIcon;
  text: string;
}

const whySubscribeItems: BenefitItem[] = [
  {
    icon: CheckCircle,
    text: "Exclusive AI Insights: Get market analysis you won't find anywhere else.",
  },
  {
    icon: CheckCircle,
    text: 'Early Access: Be the first to know about new crypto bundles and features.',
  },
  {
    icon: CheckCircle,
    text: 'Educational Content: Simplify complex crypto topics and build your knowledge.',
  },
];

export function NewsletterPageContent() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast({
        variant: 'destructive',
        title: 'Email Required',
        description: 'Please enter your email address.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await subscribeToNewsletter(db, trimmedEmail);
      if (result.success) {
        toast({
          title: 'Subscription Confirmed. Welcome to the Inner Circle.',
          description:
            'You are no longer a mere spectator of market volatility; you are now part of an elite community that leverages Neural Diagnostics to navigate the flow of global capital. Prepare for exclusive intelligence briefings that transform risk into predictable advantage, delivered directly to your inbox. Welcome to the command bridge of strategic intelligence.',
          duration: 10000,
        });
        setEmail('');
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Subscription failed. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Subscription Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <Newspaper className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Subscribe to MirbInvestments Insights
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join our community and receive the latest crypto market analysis, investment strategies,
          and educational content directly in your inbox.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-1">
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="text-2xl">Stay Ahead with Our Newsletter</CardTitle>
            <CardDescription>
              Get optimal market insights and exclusive crypto wisdom delivered to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow"
                aria-label="Email for newsletter subscription"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Why Subscribe?</CardTitle>
            <CardDescription>
              Stay ahead of the curve with insights you won’t find anywhere else.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {whySubscribeItems.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
