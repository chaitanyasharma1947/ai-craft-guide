import { Sparkles, Zap, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import barclaysBackground from "@/assets/barclays-modern-bg.jpg";
import barclaysLogo from "@/assets/barclays-current-logo.svg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${barclaysBackground})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-glow/20" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary-glow/20 rounded-full blur-xl float" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/30 rounded-full blur-xl float" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="fade-in">
          {/* Barclays Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src={barclaysLogo} 
                alt="Barclays Current Logo" 
                className="w-16 h-16 mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-50" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-hero leading-tight">
            Barclays Prompt Engineering
            <br />
            <span className="text-gradient">Hub</span>
          </h1>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 slide-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">20+ Expert Prompts</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 slide-up" style={{ animationDelay: "0.1s" }}>
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">8 Categories</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 slide-up" style={{ animationDelay: "0.2s" }}>
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">6 Domains</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="bounce-in" style={{ animationDelay: "0.5s" }}>
            <Button 
              size="lg" 
              className="btn-glow text-lg px-8 py-6 rounded-full group"
              onClick={() => {
                document.getElementById('prompts-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Explore Prompts
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 text-background">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};