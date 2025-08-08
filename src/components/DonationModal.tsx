import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Gift } from "lucide-react"

interface DonationModalProps {
  celebrityName: string
  children: React.ReactNode
}

export const DonationModal = ({ celebrityName, children }: DonationModalProps) => {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for your $${amount} donation to ${celebrityName}!`)
    setIsOpen(false)
    setAmount("")
    setPaymentMethod("")
    setName("")
    setEmail("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Heart className="h-6 w-6 text-red-500" />
            <span>Donate to {celebrityName}</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Donation Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gift-card">Gift Card</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="donor-name">Your Name</Label>
              <Input
                id="donor-name"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="donor-email">Email</Label>
              <Input
                id="donor-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-donation hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            <Gift className="h-5 w-5 mr-2" />
            Submit Donation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}