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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Check, X, Search, Filter, Upload, Image as ImageIcon } from "lucide-react"

const initialCelebrities = [
  { id: 1, name: "Emma Stone", category: "Actor", description: "Academy Award-winning actress known for her roles in La La Land and Easy A.", image: "/placeholder.svg" },
  { id: 2, name: "The Weeknd", category: "Musician", description: "Grammy Award-winning R&B artist with hits like Blinding Lights.", image: "/placeholder.svg" },
  { id: 3, name: "LeBron James", category: "Athlete", description: "NBA superstar and four-time champion.", image: "/placeholder.svg" },
]

const bookings = [
  { id: 1, user: "John Doe", celebrity: "Emma Stone", type: "Video Shoutout", date: "2024-01-15", amount: 150, status: "Pending" },
  { id: 2, user: "Jane Smith", celebrity: "The Weeknd", type: "Meet & Greet", date: "2024-02-20", amount: 500, status: "Approved" },
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("celebrities")
  const [searchQuery, setSearchQuery] = useState("")
  const [celebrities, setCelebrities] = useState(initialCelebrities)
  const [editingCelebrity, setEditingCelebrity] = useState<any>(null)
  const [newCelebrity, setNewCelebrity] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    imageFile: null as File | null
  })
  const [imagePreview, setImagePreview] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setImagePreview(imageUrl)
        if (isEdit && editingCelebrity) {
          setEditingCelebrity(prev => ({ ...prev, image: imageUrl }))
        } else {
          setNewCelebrity(prev => ({ ...prev, image: imageUrl, imageFile: file }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddCelebrity = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...celebrities.map(c => c.id)) + 1
    const newCel = {
      id: newId,
      name: newCelebrity.name,
      category: newCelebrity.category,
      description: newCelebrity.description,
      image: newCelebrity.image || "/placeholder.svg"
    }
    setCelebrities(prev => [...prev, newCel])
    alert("Celebrity added successfully!")
    setNewCelebrity({ name: "", category: "", description: "", image: "", imageFile: null })
    setImagePreview("")
  }

  const handleEditCelebrity = (celebrity: any) => {
    setEditingCelebrity({ ...celebrity })
    setImagePreview(celebrity.image)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    setCelebrities(prev => prev.map(c => 
      c.id === editingCelebrity.id ? editingCelebrity : c
    ))
    alert("Celebrity updated successfully!")
    setEditingCelebrity(null)
    setImagePreview("")
  }

  const handleDeleteCelebrity = (id: number) => {
    setCelebrities(prev => prev.filter(c => c.id !== id))
    alert("Celebrity deleted successfully!")
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
          <div className="mb-8 animate-fade-up">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-celebrity bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage celebrities and bookings for Celebrity Experience
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
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="image-upload">Upload Image</Label>
                          <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e)}
                              className="hidden"
                            />
                            <label htmlFor="image-upload" className="cursor-pointer">
                              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Click to upload image</p>
                            </label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image-url">Or Enter Image URL</Label>
                          <Input
                            id="image-url"
                            value={newCelebrity.image}
                            onChange={(e) => setNewCelebrity(prev => ({ ...prev, image: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>

                      {imagePreview && (
                        <div className="space-y-2">
                          <Label>Image Preview</Label>
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}

                      <Button type="submit" variant="premium" className="w-full hover-lift">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Celebrity
                      </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Celebrity List */}
              <div className="space-y-4 animate-fade-up stagger-2">
                <h3 className="text-xl font-semibold">Current Celebrities ({celebrities.length})</h3>
                {celebrities.map((celebrity, index) => (
                  <Card key={celebrity.id} className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4">
                          <img
                            src={celebrity.image}
                            alt={celebrity.name}
                            className="w-20 h-20 rounded-full object-cover shadow-celebrity"
                          />
                          <div>
                            <h4 className="text-lg font-semibold">{celebrity.name}</h4>
                            <Badge variant="secondary" className="mb-2">{celebrity.category}</Badge>
                            <p className="text-sm text-muted-foreground">{celebrity.description}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditCelebrity(celebrity)}
                            className="hover-lift"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="hover-lift">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="animate-scale-in">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Celebrity</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {celebrity.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteCelebrity(celebrity.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Edit Celebrity Modal */}
              {editingCelebrity && (
                <Card className="mt-8 border-2 border-primary/20 animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Edit className="h-5 w-5" />
                      <span>Edit Celebrity: {editingCelebrity.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveEdit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-name">Name</Label>
                          <Input
                            id="edit-name"
                            value={editingCelebrity.name}
                            onChange={(e) => setEditingCelebrity(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-category">Category</Label>
                          <Select 
                            value={editingCelebrity.category}
                            onValueChange={(value) => setEditingCelebrity(prev => ({ ...prev, category: value }))}
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
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editingCelebrity.description}
                          onChange={(e) => setEditingCelebrity(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Current Image</Label>
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                            <img
                              src={editingCelebrity.image}
                              alt="Current"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-image-upload">Upload New Image</Label>
                          <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                            <input
                              id="edit-image-upload"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, true)}
                              className="hidden"
                            />
                            <label htmlFor="edit-image-upload" className="cursor-pointer">
                              <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Upload new image</p>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-image-url">Or Enter New Image URL</Label>
                        <Input
                          id="edit-image-url"
                          value={editingCelebrity.image}
                          onChange={(e) => setEditingCelebrity(prev => ({ ...prev, image: e.target.value }))}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      <div className="flex space-x-4">
                        <Button type="submit" variant="premium" className="flex-1 hover-lift">
                          <Check className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setEditingCelebrity(null)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
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