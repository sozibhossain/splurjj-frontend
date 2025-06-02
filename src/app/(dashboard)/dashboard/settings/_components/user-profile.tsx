import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"

export default function UserProfile() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6 text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <User className="w-16 h-16 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">Mr. Raja</h3>
        <p className="text-sm text-gray-600">Admin</p>
      </CardContent>
    </Card>
  )
}
