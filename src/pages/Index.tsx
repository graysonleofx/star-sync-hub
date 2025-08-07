import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedCelebrities } from "@/components/FeaturedCelebrities"
import { HowItWorks } from "@/components/HowItWorks"
import { Footer } from "@/components/Footer"
import { ChatWidget } from "@/components/ChatWidget"
import { LoadingScreen } from "@/components/LoadingScreen"

const Index = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <FeaturedCelebrities />
          <HowItWorks />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </>
  );
};

export default Index;
