import { Crown } from "lucide-react"

export const LoadingScreen = ({ isLoading, onComplete }: { isLoading: boolean; onComplete: () => void }) => {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Crown className="h-16 w-16 text-accent animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <div className="h-16 w-16 border-4 border-transparent border-t-accent rounded-full" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Celebrity Experience</h2>
          <p className="text-muted-foreground">Loading Celebrity Experience...</p>
        </div>
      </div>
    </div>
  )
}