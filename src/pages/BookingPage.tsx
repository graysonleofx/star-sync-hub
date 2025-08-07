import { useState } from "react"
import { useParams } from "react-router-dom"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ChatWidget } from "@/components/ChatWidget"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Star, Calendar, Video, Users, Gift, Check } from "lucide-react"

const celebrities = {
  1: { name: "Emma Stone", category: "Actor", rating: 4.9, image: "/placeholder.svg" },
  2: { name: "The Weeknd", category: "Musician", rating: 4.8, image: "/placeholder.svg" },
}

const bookingTypes = [
  { id: "video", name: "Video Shoutout", icon: Video, price: 150, description: "Personalized video message" },
  { id: "meetgreet", name: "Meet & Greet", icon: Users, price: 500, description: "15-minute video call" },
  { id: "fancard", name: "Fan Card", icon: Gift, price: 75, description: "Signed personalized card" },
  { id: "appearance", name: "Event Appearance", icon: Calendar, price: 2500, description: "Personal appearance at your event" },
]

const BookingPage = () => {
  const { id } = useParams()
  const celebrityId = parseInt(id || "1") as keyof typeof celebrities
  const celebrity = celebrities[celebrityId] || celebrities[1]
  
  const [selectedBookingType, setSelectedBookingType] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    eventDate: "",
  })

  const selectedType = bookingTypes.find(type => type.id === selectedBookingType)
  const subtotal = selectedType?.price || 0
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // UI only - would send to backend
    alert("Booking submitted successfully! You will receive a confirmation email soon.")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Celebrity Info */}
            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-luxury">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <img
                      src={celebrity.image}
                      alt={celebrity.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h1 className="text-3xl font-bold">{celebrity.name}</h1>
                      <Badge variant="secondary" className="mt-1">
                        {celebrity.category}
                      </Badge>
                      <div className="flex items-center space-x-1 mt-2">
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
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Booking Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedBookingType} onValueChange={setSelectedBookingType}>
                    <div className="space-y-4">
                      {bookingTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value={type.id} id={type.id} />
                          <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <type.icon className="h-5 w-5 text-accent" />
                                <div>
                                  <p className="font-medium">{type.name}</p>
                                  <p className="text-sm text-muted-foreground">{type.description}</p>
                                </div>
                              </div>
                              <span className="font-semibold">${type.price}</span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {selectedBookingType === "appearance" && (
                      <div>
                        <Label htmlFor="eventDate">Event Date</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => handleInputChange("eventDate", e.target.value)}
                          required
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="message">Special Message/Instructions</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your request..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Payment Method</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Card Payment</SelectItem>
                          <SelectItem value="crypto">Crypto</SelectItem>
                          <SelectItem value="bank">Bank/Wire Transfer</SelectItem>
                          <SelectItem value="code">Redeem Code</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Order Summary */}
              {selectedBookingType && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>{selectedType?.name}</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      variant="premium"
                      disabled={!selectedBookingType || !paymentMethod}
                      onClick={handleSubmit}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Complete Booking
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}

export default BookingPage