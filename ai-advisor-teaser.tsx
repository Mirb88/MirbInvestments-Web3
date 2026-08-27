'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  Lightbulb,
  TrendingUp,
  Shield,
  BarChart,
  LoaderCircle,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ROUTES } from '@/lib/routes';

export function AiAdvisorTeaser() {
  const [recommendation, setRecommendation] = useState<{ id: string; reason: string; } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleGetAdvice = async (goal: 'growth' | 'gains' | 'stability') => {
    setRecommendation(null);
    setError(null);
    setIsLoading(true);

    const systemPromptAdvisor = `You are a private banker for elite clients of MirbInvestments. Your speech is discreet, motivating, and focused on long-term wealth growth. Avoid financial advice that sounds like gambling; promote stability, security, and the 'Human-AI Synergy' philosophy.`;

    const goalTextMap = {
      growth: 'long-term growth',
      gains: 'fast gains with some risk',
      stability: 'stability and safety as a beginner'
    };

    const userPrompt = `You are an AI investment advisor for a crypto platform called MirbInvestments. Your goal is to recommend one of three crypto bundles to a user based on their investment goal. Be friendly and encouraging.

The available bundles are:
1.  **Starter Bundle (id: starter-30)**: Contains Bitcoin, Ethereum, and Arbitrum. Good for stability and a first step into crypto.
2.  **Blue-Chip Crypto (id: bluechip-100)**: Contains Bitcoin, Ethereum, and Solana. Focused on established, large-cap assets for long-term growth.
3.  **Builder's Choice (id: builders-choice-75)**: Contains one user-selected major asset plus a surprise bonus coin. Good for users who want some control but also a bit of high-risk, high-reward potential (fast gains).

User's investment goal: "${goalTextMap[goal]}"

Analyze the user's goal and recommend the most suitable bundle.

- If the user mentions **stability, safety, or is a beginner**, recommend the "starter-30" bundle.
- If the user mentions **long-term growth, solid projects, or established assets**, recommend the "bluechip-100" bundle.
- If the user mentions **fast gains, risk, new projects, or wants to pick a coin**, recommend the "builders-choice-75" bundle.

Provide your response as a JSON object with "recommendedBundleId" and "recommendationReason" keys. Only return the JSON object, nothing else.`;
    
    try {
        const response = await fetch('/api/ai/proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPromptAdvisor },
                    { role: 'user', content: userPrompt }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An error occurred fetching the recommendation.');
        }

        const result = await response.json();
        const aiContent = result.content;
        
        const jsonMatch = aiContent.match(/```json\n([\s\S]*?)\n```|({[\s\S]*})/);
        if (!jsonMatch) {
            console.error("AI did not return valid JSON:", aiContent);
            throw new Error("The AI advisor returned an invalid response. Please try again.");
        }
        
        const jsonString = jsonMatch[1] || jsonMatch[2];
        const parsed = JSON.parse(jsonString);

        if (parsed.recommendedBundleId && parsed.recommendationReason) {
             setRecommendation({
                id: parsed.recommendedBundleId,
                reason: parsed.recommendationReason,
            });
        } else {
             throw new Error("The AI advisor response was incomplete.");
        }

    } catch (e: any) {
        console.error("Failed to get AI advice:", e);
        setError(e.message || "Failed to communicate with the AI advisor.");
    } finally {
        setIsLoading(false);
    }
  };

  const goalOptions = [
    { id: 'growth', label: 'Long-term Growth', icon: BarChart },
    { id: 'gains', label: 'Fast Gains', icon: TrendingUp },
    { id: 'stability', label: 'Stability', icon: Shield },
  ];

  return (
    <section id="ai-advisor" className="w-full bg-card py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="bg-background max-w-4xl mx-auto shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight">
                  Not Sure Where to Start?
                </h2>
              </div>
              <p className="text-muted-foreground mb-6 text-lg text-center md:text-left" data-ai-hint="ai crypto advisor">
                Let our AI find the perfect crypto bundle for your investment
                goals. Get a personalized recommendation in seconds.
              </p>

              <div className="space-y-4">
                {goalOptions.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start text-base h-14"
                    onClick={() => handleGetAdvice(id as any)}
                    disabled={isLoading}
                  >
                    <Icon className="mr-4 h-5 w-5 text-bnb-gold" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 p-8 md:p-10 flex items-center justify-center">
              {isLoading ? (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-4">
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                    <span className="mt-2 font-medium">MirbInvestments Intelligence is analyzing global markets...</span>
                </div>
              ) : recommendation ? (
                <div className="text-center">
                  <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    AI Recommendation
                  </h3>
                  <div className="text-muted-foreground mb-6">
                    {recommendation.reason}
                  </div>

                  <Button asChild size="lg">
                    <Link href={`${ROUTES.CRYPTO_SHOP}?bundle=${recommendation.id}`}>
                      Explore Your Bundle <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              ) : error ? (
                 <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                        <Button asChild variant="link" className="p-0 h-auto block mt-2">
                            <Link href={ROUTES.CRYPTO_SHOP}>Explore Manually</Link>
                        </Button>
                    </AlertDescription>
                </Alert>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium">
                    Select a goal to get your instant recommendation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}