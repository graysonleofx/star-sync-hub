import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedCelebrities } from "@/components/FeaturedCelebrities"
import { HowItWorks } from "@/components/HowItWorks"
import { ChatWidget } from "@/components/ChatWidget"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCelebrities />
        <HowItWorks />
      </main>
      <ChatWidget />
    </div>
  );
};

export default Index;
