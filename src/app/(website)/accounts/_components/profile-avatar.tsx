"use client"

import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

interface ProfileAvatarProps {
  profileImage: string
  setProfileImage: (image: string) => void
  userName: string
}

export default function ProfileAvatar({ profileImage, setProfileImage, userName }: ProfileAvatarProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerImageUpload = () => {
    document.getElementById("imageUpload")?.click()
  }

  return (
    <div className="relative inline-block">
      <Avatar className="w-24 h-24 mx-auto mb-4 cursor-pointer" onClick={triggerImageUpload}>
        <AvatarImage src={profileImage || "/placeholder.svg"} alt={userName} />
        <AvatarFallback>
          {userName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className="absolute bottom-4 right-0 bg-gray-600 rounded-full p-1 cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={triggerImageUpload}
      >
        <Camera className="w-4 h-4 text-white" />
      </div>
      <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
    </div>
  )
}
