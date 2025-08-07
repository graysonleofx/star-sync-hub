import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Crown } from "lucide-react"

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mock API call - just for UI demonstration
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-luxury bg-gradient-premium hover:shadow-glow hover:scale-110 transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 h-96 shadow-luxury bg-gradient-card animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-premium rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-primary-foreground" />
              <span className="font-medium text-primary-foreground">Celebrity Experience</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 space-y-3 h-64 overflow-y-auto">
            <div className="bg-muted rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">Hi! How can I help you with celebrity bookings today?</p>
              <span className="text-xs text-muted-foreground">Support Agent • Just now</span>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="icon"
                variant="premium"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}