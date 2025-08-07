import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ChatWidget } from "@/components/ChatWidget"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, ArrowUpDown } from "lucide-react"
import { Link } from "react-router-dom"

const celebrities = [
  { id: 1, name: "Emma Stone", category: "Actor", rating: 4.9, image: "/placeholder.svg", available: true },
  { id: 2, name: "The Weeknd", category: "Musician", rating: 4.8, image: "/placeholder.svg", available: true },
  { id: 3, name: "Tom Holland", category: "Actor", rating: 4.9, image: "/placeholder.svg", available: false },
  { id: 4, name: "Ariana Grande", category: "Musician", rating: 5.0, image: "/placeholder.svg", available: true },
  { id: 5, name: "Chris Evans", category: "Actor", rating: 4.7, image: "/placeholder.svg", available: true },
  { id: 6, name: "Taylor Swift", category: "Musician", rating: 5.0, image: "/placeholder.svg", available: false },
  { id: 7, name: "Ryan Reynolds", category: "Actor", rating: 4.8, image: "/placeholder.svg", available: true },
  { id: 8, name: "Dwayne Johnson", category: "Actor", rating: 4.9, image: "/placeholder.svg", available: true },
]

const BrowseCelebrities = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const filteredCelebrities = celebrities
    .filter(celebrity => {
      const matchesSearch = celebrity.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || celebrity.category === categoryFilter
      const matchesRating = ratingFilter === "all" || celebrity.rating >= parseFloat(ratingFilter)
      const matchesAvailability = availabilityFilter === "all" || celebrity.available.toString() === availabilityFilter
      return matchesSearch && matchesCategory && matchesRating && matchesAvailability
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return b.rating - a.rating
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Browse Celebrities</h1>
            <p className="text-xl text-muted-foreground">
              Discover and book your favorite celebrities for unforgettable experiences
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-2xl p-6 mb-8 shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search celebrities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Actor">Actor</SelectItem>
                  <SelectItem value="Musician">Musician</SelectItem>
                  <SelectItem value="Athlete">Athlete</SelectItem>
                  <SelectItem value="Influencer">Influencer</SelectItem>
                </SelectContent>
              </Select>

              {/* Rating Filter */}
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <Star className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCelebrities.map((celebrity) => (
              <Card key={celebrity.id} className="group hover:shadow-luxury transition-all duration-300 bg-gradient-card animate-fade-in">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={celebrity.image}
                      alt={celebrity.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {!celebrity.available && (
                      <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                        <span className="text-white font-medium">Unavailable</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold">{celebrity.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {celebrity.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(celebrity.rating) ? "text-accent fill-accent" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {celebrity.rating}
                      </span>
                    </div>
                    
                    <Link 
                      to={`/book/${celebrity.id}`} 
                      className={celebrity.available ? "" : "pointer-events-none"}
                    >
                      <Button 
                        className="w-full" 
                        variant={celebrity.available ? "premium" : "secondary"}
                        disabled={!celebrity.available}
                      >
                        {celebrity.available ? "Book Now" : "Unavailable"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCelebrities.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-2">No celebrities found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}

export default BrowseCelebrities