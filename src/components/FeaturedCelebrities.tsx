import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const featuredCelebrities = [
  {
    id: 1,
    name: "Emma Stone",
    category: "Actor",
    image: "/lovable-uploads/celebrity-1.jpg", // Placeholder for now
    rating: 4.9,
    reviews: 2847,
    price: 299,
    isVerified: true,
    availability: "Available",
  },
  {
    id: 2,
    name: "Ryan Reynolds",
    category: "Actor",
    image: "/lovable-uploads/celebrity-2.jpg", // Placeholder for now
    rating: 4.8,
    reviews: 3291,
    price: 499,
    isVerified: true,
    availability: "Busy until Dec 15",
  },
  {
    id: 3,
    name: "Taylor Swift",
    category: "Musician",
    image: "/lovable-uploads/celebrity-3.jpg", // Placeholder for now
    rating: 5.0,
    reviews: 5847,
    price: 999,
    isVerified: true,
    availability: "Limited slots",
  },
  {
    id: 4,
    name: "Dwayne Johnson",
    category: "Actor",
    image: "/lovable-uploads/celebrity-4.jpg", // Placeholder for now
    rating: 4.9,
    reviews: 4123,
    price: 599,
    isVerified: true,
    availability: "Available",
  },
]

export const FeaturedCelebrities = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredCelebrities.length)
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredCelebrities.length) % featuredCelebrities.length)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Celebrities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book exclusive experiences with A-list celebrities from movies, music, sports, and more
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredCelebrities.map((celebrity) => (
            <CelebrityCard key={celebrity.id} celebrity={celebrity} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredCelebrities.map((celebrity) => (
                <div key={celebrity.id} className="w-full flex-shrink-0 px-4">
                  <CelebrityCard celebrity={celebrity} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredCelebrities.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.href = '/celebrities'}
          >
            View All Celebrities
          </Button>
        </div>
      </div>
    </section>
  )
}

const CelebrityCard = ({ celebrity }: { celebrity: typeof featuredCelebrities[0] }) => {
  return (
    <Card className="overflow-hidden hover:shadow-luxury transition-all duration-300 group bg-gradient-card">
      <div className="relative">
        {/* Placeholder for celebrity image */}
        <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted-foreground/20 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{celebrity.name}</p>
            </div>
          </div>
        </div>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-accent"
        >
          <Heart className="h-4 w-4" />
        </Button>
        
        {/* Availability Badge */}
        <Badge 
          className={`absolute top-3 left-3 ${
            celebrity.availability === "Available" 
              ? "bg-green-500/90 text-white" 
              : "bg-orange-500/90 text-white"
          }`}
        >
          {celebrity.availability}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{celebrity.name}</h3>
          {celebrity.isVerified && (
            <Badge variant="secondary" className="text-xs">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Verified
            </Badge>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm mb-3">{celebrity.category}</p>
        
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{celebrity.rating}</span>
            <span className="text-muted-foreground text-sm">({celebrity.reviews})</span>
          </div>
        </div>
        
        <Button className="w-full" variant="premium">
          Book Now
        </Button>
      </CardContent>
    </Card>
  )
}