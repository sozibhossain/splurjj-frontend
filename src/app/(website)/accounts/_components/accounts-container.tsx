"use client"

import { useState } from "react"
import ProfileSidebar from "./profile-sidebar"
import PersonalInformation from "./personal-information"
import ChangePassword from "./change-password"


export default function AccountContainer() {
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W8MroxwCcNmJJ2OsPMblZ5W8hCZek8.png",
  )

  const [userProfile, setUserProfile] = useState({
    firstName: "Bessie",
    lastName: "Edwards",
    email: "darrellsteward@gmail.com",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Accounts</h1>

        <div className="flex gap-8">
          <ProfileSidebar
            userProfile={userProfile}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="flex-1 bg-white rounded-lg p-8">
            {activeTab === "personal" && (
              <PersonalInformation userProfile={userProfile} setUserProfile={setUserProfile} />
            )}
            {activeTab === "password" && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  )
}

