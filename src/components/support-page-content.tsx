'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LifeBuoy, Mail, MessageCircle, Send, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { createSupportRequest } from '@/services/support';
import { useToast } from '@/hooks/use-toast';
import type { FaqItem } from '@/lib/types';
import { ROUTES } from '@/lib/routes';


const faqItems: FaqItem[] = [
  {
    id: 'faq-club-1',
    question: "What is the primary benefit of being a MirbInvestments Club member?",
    answer: "Club membership grants you an exclusive status and priority access. Most importantly, paid members (Gold and Silver) have priority registration for limited-capacity events, such as our elite Strategic Convergence Jahorina 2026, ensuring you have a seat at the table where the future is being discussed.",
  },
  {
    id: 'faq-club-2',
    question: "Do I receive a physical card and an NFT as a Club member?",
    answer: "Yes. Upon activating a paid membership (Silver or Gold), you will receive a unique NFT certificate as a digital proof of your status. You also gain the ability to apply for a high-quality, physical membership card to be crafted and delivered to you.",
  },
  {
    id: 'faq-club-3',
    question: "How can I obtain the Platinum Lifetime card?",
    answer: "The Platinum card represents the pinnacle of partnership with our ecosystem. It has no price and cannot be purchased. It is an honor offered exclusively by the MirbInvestments team to individuals who demonstrate exceptional long-term vision, unwavering ethics, and a strategic contribution to our community.",
  },
  {
    id: 'faq-1',
    question: "How does the 'Crypto Shop' work?",
    answer: "Our Crypto Shop simplifies buying crypto. You choose a predefined bundle for a fixed price. Our team then executes the trade and delivers the crypto directly to your MirbInvestments portfolio, minimizing complexity for you. We handle the wallets, you enjoy the growth.",
  },
  {
    id: 'faq-exchange-1',
    question: 'What is the "Reserved Crypto Exchange"?',
    answer: "The Reserved Exchange is our personalized, over-the-counter (OTC) service. It allows you to buy or sell larger amounts of crypto for fiat currency (or vice versa) at a pre-confirmed, guaranteed rate. You submit a request, and our team contacts you to lock in the price and arrange the settlement directly to your chosen crypto wallet or bank account.",
  },
  {
    id: 'faq-exchange-2',
    question: 'How is the final price determined in the Exchange?',
    answer: 'After you submit a request, our trading team sources the best possible rate from our liquidity partners. We then contact you via email to present this guaranteed rate. The price is locked only after you confirm. This process ensures you get a competitive, transparent price with minimal slippage.',
  },
  {
    id: 'faq-exchange-3',
    question: 'How long does an exchange transaction take?',
    answer: 'Standard requests are typically processed within a few hours. For urgent needs, you can use the "Contact Support for Express Exchange" option. Our team can often confirm a rate and process the transaction in under 10 minutes.',
  },
  {
    id: 'faq-exchange-4',
    question: 'Can I use the Exchange if I am not a registered user?',
    answer: "No, the Exchange service is exclusively available to registered MirbInvestments users. Registration is free and allows us to provide a more secure and personalized service.",
  },
  {
    id: 'faq-exchange-5',
    question: 'What are the payout options?',
    answer: 'We offer flexible settlement options. We can send crypto directly to any external wallet address you provide, or we can transfer fiat currency to your bank account. In the future, we plan to offer in-person settlement at our officially designated educational and business centers.',
  },
  {
    id: 'faq-2',
    question: 'How long does it take for my purchased crypto to appear?',
    answer: 'Once your payment is confirmed, our team will process your bundle purchase. This typically takes up to 4 hours, and you will receive a notification when your crypto is securely in your portfolio.',
  },
  {
    id: 'faq-3',
    question: 'Is my money safe with MirbInvestments?',
    answer: 'Security is our absolute top priority. We employ industry-standard security protocols, including Two-Factor Authentication (2FA) and data encryption, to protect your assets and data. Your crypto is held in securely managed wallets, so you never have to worry about private keys.',
  },
  {
    id: 'faq-4',
    question: 'Can I use MirbInvestments to transfer assets between different networks (bridging)?',
    answer: "While we are not a direct cross-chain bridge, our platform offers a unique advantage. You can deposit assets from various supported networks (like TRC20, BEP20, ERC20) into your single MirbInvestments account. From there, you can invest or withdraw to any supported network without paying high on-chain gas fees for every cross-network transaction. This makes managing assets across chains simpler and more cost-effective.",
  },
  {
    id: 'faq-5',
    question: 'What if the cryptocurrency I want to use is not on the list?',
    answer: 'Our list of supported currencies is regularly updated. If your desired cryptocurrency is not on the list, please contact our customer support. We will do our best to find a solution and consider adding that currency in the future.',
  },
];


function SupportForm() {
    const { user, db } = useAuth();
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !subject || !message) {
            toast({
                variant: 'destructive',
                title: 'All fields are required',
                description: 'Please fill out all fields in the form.',
            });
            return;
        }
        if (!db) {
            toast({
                variant: 'destructive',
                title: 'Connection Error',
                description: 'Cannot connect to the support service. Please try again later.',
            });
            return;
        }
        setIsLoading(true);
        try {
            const result = await createSupportRequest(db, {
                name,
                email,
                subject,
                message,
                userId: user?.uid,
            });

            if (result.success) {
                toast({
                    title: 'Request Submitted',
                    description: 'Thank you! Our support team will get back to you shortly.',
                });
                // Reset form
                setSubject('');
                setMessage('');
                if (!user) {
                    setName('');
                    setEmail('');
                }
            } else {
                throw new Error(result.error || 'An unknown error occurred.');
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Submission Failed',
                description: error.message || 'Could not submit your request. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Submit a Support Request</CardTitle>
                <CardDescription>
                 Your inquiry will be analyzed by our <strong>synergistic team</strong> of <strong>seasoned experts</strong> and <strong>advanced AI</strong> to ensure you receive a precise and purposeful response.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input 
                                id="name" 
                                placeholder="John Doe" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Your Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="john@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={isLoading || !!user}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                            id="subject" 
                            placeholder="e.g., Issue with my deposit" 
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea 
                            id="message" 
                            placeholder="Please describe your issue in detail..." 
                            className="min-h-[120px]" 
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Request
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export function SupportPageContent() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <LifeBuoy className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl lg:text-5xl">
          MirbInvestments Elite Support
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Our support page is not just a technical channel; it's an extension of our philosophy. Here, your inquiries are analyzed by our <strong>synergistic team</strong> of <strong>seasoned experts</strong> and <strong>advanced AI</strong>, ensuring you receive <span className="text-primary">precise and purposeful</span> answers promptly.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-8">
            <SupportForm />

            <div>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left text-lg">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                        {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>

        <div className="lg:col-span-2">
            <div className="sticky top-20 space-y-8">
                <Card id="direct-contact-options" className="border-primary/50">
                <CardHeader>
                    <CardTitle className="text-2xl">Direct Contact Options</CardTitle>
                    <CardDescription>
                    For direct inquiries or time-sensitive matters, use our priority channels.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    
                    <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Mail className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold">Email Support</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                        Our primary channel for all inquiries.
                    </p>
                    <a href="mailto:support@mirb.investments" className="text-primary font-medium hover:underline block break-all">
                        support@mirb.investments
                    </a>
                    </div>

                    <div className="border-t border-border -mx-6"></div>
                    
                    <div>
                    <div className="flex items-center gap-3 mb-2">
                        <MessageCircle className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold">WhatsApp</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                        For quick chats, you can also reach us on WhatsApp.
                    </p>
                    <Button asChild variant="secondary" className="w-full">
                        <Link href="https://wa.me/387603527846" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat on WhatsApp
                        </Link>
                    </Button>
                    </div>
                </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
