'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, BookOpen, Wand2, BrainCircuit, Zap, ShieldAlert, Crown, ShieldCheck, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { aiInsights } from '@/lib/data';
import Image from 'next/image';
import AcademyAIWrapper from '@/components/ai/academy-ai-wrapper';
import { ROUTES } from '@/lib/routes';


function FeaturedArticleCard({ insight }: { insight: (typeof aiInsights)[0] }) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50">
        <CardHeader>
            <Badge variant="secondary" className="w-fit mb-2 bg-primary/10 text-primary border-primary/20">
                {insight.category}
            </Badge>
            <CardTitle className="text-2xl">{insight.title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{insight.snippet}</p>
        </CardContent>
        <CardFooter>
            <Button asChild variant="outline">
                <Link href={`${ROUTES.AI_INSIGHTS}/${insight.slug}`}>
                    Read Full Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
    </Card>
  );
}

/* USAVRŠENI MIRBINVESTMENTS ELITNI BANER - ZAMIJENIO STARI CLUB BANNER */
function ClubBanner() {
    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a] p-8 md:p-10 shadow-2xl border border-primary/30 text-white my-8">
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-[#e0e1dd] text-[#0d1b2a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                    <Crown className="h-3.5 w-3.5 text-[#0d1b2a]" />
                    Exclusive Membership Privilege
                </div>
                
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                    Strategic Convergence – Jahorina
                </h2>
                
                <p className="text-lg text-[#e0e1dd] max-w-3xl mx-auto mb-6 leading-relaxed">
                    The upcoming elite summit on the convergence of Artificial Intelligence, advanced finance, and autonomous security systems is approaching. 
                    <span className="block mt-2 font-bold text-white bg-primary/20 p-3 rounded-lg border border-primary/30">
                        All Silver and Golden Membership holders who activate their status by June 15, 2026, are granted FREE ACCESS + 2 DAYS OF COMPLIMENTARY ACCOMMODATION on Jahorina.
                    </span>
                </p>
                
                {/* PLATINUM HOLDERS ULTRA-EXCLUSIVE SECTION */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-5 rounded-lg max-w-2xl mx-auto mb-8 text-left">
                    <p className="text-sm md:text-base text-[#e0e1dd] leading-relaxed">
                        👑 <strong className="text-white">The Platinum Lifetime Card Holders:</strong> In addition to full summit access and premium accommodation, Platinum holders possess ultra-exclusive privileges that will be meticulously presented in detail during any official MirbInvestments organized meetings.
                    </p>
                </div>

                <Button asChild size="lg" className="bg-white text-[#0d1b2a] hover:bg-[#e0e1dd] font-bold shadow-lg shadow-white/10 transition-all duration-300">
                    <Link href={ROUTES.CLUB}>
                        Activate / Upgrade Membership Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}

function AcademyDisclaimer() {
  return (
    <Card className="mt-16 border-dashed bg-muted/30">
        <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldAlert className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-xl text-muted-foreground">Scientific & Technical Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm prose-invert max-w-none text-muted-foreground">
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-foreground">Scientific Interpretation Notice:</h4>
                    <p>
                        Information presented within the MirbInvestments Academy is based on proprietary algorithms and neural diagnostics that serve as an analytical tool for achieving market clarity. Although our system applies rigorous scientific methods and the strict rules of traditional capital management, all generated data represents a technological analysis of probability, not absolute predictions.
                    </p>
                </div>
                 <div>
                    <h4 className="font-bold text-foreground">Nature of Content:</h4>
                    <p>
                       The content of the lessons and the "Neural Health Score" indicators are exclusively for educational and informational purposes. MirbInvestments does not provide personalized financial advice; users are responsible for their own interpretation of data obtained through our hybrid stabilization architecture.
                    </p>
                </div>
                 <div>
                    <h4 className="font-bold text-foreground">Capital Integrity:</h4>
                    <p>
                       The Capital Guard architecture is designed to identify anomalies and volatility using an advanced Web3 security protocol, but it cannot eliminate the inherent risks of digital markets. MirbInvestments encourages all members to pursue continuous education as a fundamental method of risk mitigation.
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export function AcademyPageContent() {
    // Exclude the legacy retrospective from the main Academy display list to keep the UI focused on current strategy.
    const filteredInsights = aiInsights.filter(i => i.slug !== 'crypto-summit-jahorina-2026-ai-real-estate-tourism');
    
    const featuredInsights = filteredInsights.filter(i => i.isFeatured);
    const beginnerGuides = filteredInsights.filter(i => i.category === "Beginner's Guide" && !i.isFeatured);
    const advancedGuides = filteredInsights.filter(i => i.category !== "Beginner's Guide" && !i.isFeatured);

  return (
    <>
      <div className="container mx-auto px-4 py-12 md:px-6">
        <header className="mb-12 text-center">
          <BookOpen className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
            The MirbInvestments AI Explainer Academy
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Welcome to your free crypto university where human insight meets AI precision. Learn complex topics with guided clarity, powered by elite AI minds.
          </p>
        </header>
        
        {/* AI Explainer is prominently featured at the top */}
        <div id="ai-explainer" className="mb-16 scroll-mt-20">
          <Card className="bg-card shadow-xl max-w-4xl mx-auto">
              <CardHeader>
                  <div className="flex flex-row items-center gap-3">
                  <Wand2 className="h-8 w-8 text-primary" />
                  <div>
                      <CardTitle className="text-2xl">AI Term Explainer</CardTitle>
                      <p className="text-base text-muted-foreground mt-2">
                          Confused by a crypto term? Click a topic or type your own, and let our AI explain it simply.
                      </p>
                  </div>
                  </div>
              </CardHeader>
              <CardContent>
                  <AcademyAIWrapper />
              </CardContent>
          </Card>
        </div>

        {/* INTEGRISANI NOVI MANIFEST: THE SYNERGY SHAPING THE WORLD */}
        <div className="mb-16 max-w-4xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-xl border border-border">
            <h2 className="text-3xl font-extrabold text-foreground mb-4 border-b pb-4 flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
                The Synergy Shaping the World: AI, Humanoid Robotics, and the Future of the Security Sector
            </h2>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                We are witnessing a historical moment where the boundaries between technology and practical implementation are dissolving. The human-AI synergy within the <strong className="text-foreground">MirbInvestments</strong> ecosystem has long transcended purely economic frameworks. Our current strategy for securing private properties, luxury clubs, and commercial centers is laying down the foundations that will naturally expand into public spaces in the near future—including public squares, streets, avenues, and smart parks. This evolution has been clear to many for a long time, driven by years of global AI presentations featuring humanoid robotics.
            </p>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Due to the strictly limited number of participants for the upcoming operational convergence on Jahorina, absolute priority for securing a seat and accessing closed technical modules is given to verified members of our platform.
            </p>

            {/* EXPERT VISION SUBSECTION */}
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2 mt-8">
                🛡️ An Expert Look into the Near Future: Global Security Standards
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
                We present a broader spectrum of advanced tactical and operational capabilities that MirbInvestments maps through its expert vision. This is how the near future will likely look across planet Earth, utilizing superior AI advantages that offer immense potential in both the financial and security domains:
            </p>
            <div className="bg-muted/40 border-l-4 border-primary p-4 rounded-r-lg space-y-4 text-sm mb-6">
                <p><strong>Preventive Equipment:</strong> While modern autonomous systems already possess basic defensive functions, the near future brings full integration of built-in stun guns, pepper-spray dispensers, and systems for rapid, anatomically safe, and legally compliant restraining of offenders directly on-site.</p>
                <p><strong>Hyper-Response in Smart Zones:</strong> By simply pressing an integrated button on a smart bench, fence, or street lamppost, the nearest AI humanoid robot (along with a second or third unit, if needed) instantly receives an encrypted alert and arrives at the exact geolocation at ultra-high speed to secure the area using premium ethical methods.</p>
                <p><strong>Triage and Validation:</strong> Upon arrival at the scene, the robot autonomously assesses the situation, utilizing advanced algorithms to distinguish between a real security threat, triviality, or an intentional attempt to manipulate the system.</p>
            </div>

            {/* ZERO-ABUSE PROTOCOL SUBSECTION */}
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2 mt-6">
                ⚖️ Zero-Abuse Protocol: Who Dispatches Additional Intervention?
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                To eliminate even the slightest possibility of manipulation or misconduct, security protocols will be strictly and hierarchically established. In the near future, the final decision to activate additional intervention factors, whether state or private authorities, will be jointly made by <strong>AI, human operators, and the humanoid robot in a mutually synchronized and encrypted connection</strong>. This fully guarantees the legal, ethical, and operational integrity of every field action.
            </p>

            {/* VISIONARY EPILOGUE */}
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2 mt-6">
                🌱 Visionary Epilogue: Time, Truth, and Sovereign Justice
            </h3>
            <div className="bg-muted/20 border border-border p-5 rounded-lg text-sm text-muted-foreground space-y-3 italic">
                <p className="not-italic text-base text-foreground font-semibold">"If tomorrow were the Judgment Day and one has a sapling in hand, let him plant it."</p>
                <p>Ultimately, time will unerringly reveal its essence and prove the immense purpose of Artificial Intelligence (AI) for humanity—notably within the fields of advanced finance, uncompromising security, and most importantly: the unveiling of Truth and the establishment of superior values. Once these pillars are set, processes naturally align along their most advanced paths.</p>
                <p>The MirbInvestments team uncompromisingly aligns itself with these premium values, operating always in accordance with absolute justice. In this unique historical moment, humanity has a clear opportunity to collaborate with AI in an effort to correct many trajectories on planet Earth that have veered in wrong directions. We work tirelessly with top priorities and pure intentions, while humbly recognizing that only God knows when the Judgment Day will arrive.</p>
            </div>
        </div>

        {/* Featured Insights Section */}
        {featuredInsights.length > 0 && (
            <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Vision & Strategy</h2>
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                    {featuredInsights.map((insight) => (
                       <FeaturedArticleCard key={insight.id} insight={insight} />
                    ))}
                </div>
            </div>
        )}

        {/* Club Banner (New Elitni Modul sa Paketima i Jahorina Beneficijama) */}
        <div className="mb-16">
             <ClubBanner />
        </div>

        {/* Regular Guides Section */}
        <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><BookOpen className="h-8 w-8 text-primary"/>Beginner's Reading List</h2>
              <div className="space-y-8">
              {beginnerGuides.map((insight) => (
              <Card key={insight.id} className="bg-card">
                  <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                      {insight.category}
                  </Badge>
                  <CardTitle className="text-2xl">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <p className="text-muted-foreground">{insight.snippet}</p>
                  </CardContent>
                  <CardFooter>
                  <Button asChild>
                      <Link href={`${ROUTES.AI_INSIGHTS}/${insight.slug}`}>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
                  </CardFooter>
              </Card>
              ))}
              </div>
            </div>
          
          {advancedGuides.length > 0 && (
              <div>
                  <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><BrainCircuit className="h-8 w-8 text-primary"/>Advanced Analysis</h2>
                  <div className="space-y-8">
                  {advancedGuides.map((insight) => (
                      <Card key={insight.id} className="bg-card">
                      <CardHeader>
                          <Badge variant="secondary" className="w-fit mb-2">
                          {insight.category}
                          </Badge>
                          <CardTitle className="text-2xl">{insight.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground">{insight.snippet}</p>
                      </CardContent>
                      <CardFooter>
                          <Button asChild>
                          <Link href={`${ROUTES.AI_INSIGHTS}/${insight.slug}`}>
                              Read Full Analysis
                              <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                          </Button>
                      </CardFooter>
                      </Card>
                  ))}
                  </div>
            </div>
          )}
        </div>
        <AcademyDisclaimer />
      </div>
    </>
  );
}
