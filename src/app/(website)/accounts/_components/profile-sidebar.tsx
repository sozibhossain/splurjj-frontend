"use client"

import { User, Lock, LogOut } from "lucide-react"
import ProfileAvatar from "./profile-avatar"

interface UserProfile {
  firstName: string
  lastName: string
  email: string
}

interface ProfileSidebarProps {
  userProfile: UserProfile
  profileImage: string
  setProfileImage: (image: string) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function ProfileSidebar({
  userProfile,
  profileImage,
  setProfileImage,
  activeTab,
  setActiveTab,
}: ProfileSidebarProps) {
  return (
    <div className="w-80 bg-white rounded-lg p-6 h-fit">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <ProfileAvatar
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          userName={`${userProfile.firstName} ${userProfile.lastName}`}
        />
        <h2 className="text-xl font-semibold text-gray-900">
          {userProfile.firstName} {userProfile.lastName}
        </h2>
        <p className="text-gray-500 text-sm">{userProfile.email}</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <button
          onClick={() => setActiveTab("personal")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
            activeTab === "personal" ? "bg-gray-800 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <User className="w-5 h-5" />
          Personal Information
        </button>

        <button
          onClick={() => setActiveTab("password")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
            activeTab === "password" ? "bg-gray-800 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Lock className="w-5 h-5" />
          Change Password
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </nav>
    </div>
  )
}
