import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Check, X, Search, Filter } from "lucide-react"

const celebrities = [
  { id: 1, name: "Emma Stone", category: "Actor", description: "Academy Award-winning actress", image: "/placeholder.svg" },
  { id: 2, name: "The Weeknd", category: "Musician", description: "Grammy Award-winning artist", image: "/placeholder.svg" },
]

const bookings = [
  { id: 1, user: "John Doe", celebrity: "Emma Stone", type: "Video Shoutout", date: "2024-01-15", amount: 150, status: "Pending" },
  { id: 2, user: "Jane Smith", celebrity: "The Weeknd", type: "Meet & Greet", date: "2024-02-20", amount: 500, status: "Approved" },
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("celebrities")
  const [searchQuery, setSearchQuery] = useState("")
  const [newCelebrity, setNewCelebrity] = useState({
    name: "",
    category: "",
    description: "",
    image: ""
  })

  const handleAddCelebrity = (e: React.FormEvent) => {
    e.preventDefault()
    // UI only - would add to backend
    alert("Celebrity added successfully!")
    setNewCelebrity({ name: "", category: "", description: "", image: "" })
  }

  const handleBookingAction = (bookingId: number, action: "approve" | "reject") => {
    // UI only - would update backend
    alert(`Booking ${action}d successfully!`)
  }

  const filteredBookings = bookings.filter(booking =>
    booking.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.celebrity.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage celebrities and bookings
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="celebrities">Manage Celebrities</TabsTrigger>
              <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="celebrities" className="space-y-6">
              {/* Add Celebrity Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Add New Celebrity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCelebrity} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={newCelebrity.name}
                          onChange={(e) => setNewCelebrity(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Celebrity name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={newCelebrity.category}
                          onValueChange={(value) => setNewCelebrity(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Actor">Actor</SelectItem>
                            <SelectItem value="Musician">Musician</SelectItem>
                            <SelectItem value="Athlete">Athlete</SelectItem>
                            <SelectItem value="Influencer">Influencer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newCelebrity.description}
                        onChange={(e) => setNewCelebrity(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Celebrity description"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newCelebrity.image}
                        onChange={(e) => setNewCelebrity(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="Image URL"
                      />
                    </div>
                    <Button type="submit" variant="premium">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Celebrity
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Celebrity List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Current Celebrities</h3>
                {celebrities.map((celebrity) => (
                  <Card key={celebrity.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={celebrity.image}
                            alt={celebrity.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="text-lg font-semibold">{celebrity.name}</h4>
                            <Badge variant="secondary">{celebrity.category}</Badge>
                            <p className="text-sm text-muted-foreground mt-1">{celebrity.description}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              {/* Search and Filter */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search bookings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-accent">{bookings.length}</div>
                    <div className="text-muted-foreground">Total Bookings</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {bookings.filter(b => b.status === "Pending").length}
                    </div>
                    <div className="text-muted-foreground">Pending Review</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary">
                      ${bookings.reduce((sum, b) => sum + b.amount, 0)}
                    </div>
                    <div className="text-muted-foreground">Total Revenue</div>
                  </CardContent>
                </Card>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-4">
                            <span className="font-medium">{booking.user}</span>
                            <Badge variant="secondary">{booking.celebrity}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {booking.type} • {booking.date} • ${booking.amount}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              booking.status === "Pending" 
                                ? "bg-yellow-500/20 text-yellow-700" 
                                : "bg-green-500/20 text-green-700"
                            }
                          >
                            {booking.status}
                          </Badge>
                          {booking.status === "Pending" && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleBookingAction(booking.id, "approve")}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleBookingAction(booking.id, "reject")}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AdminDashboard