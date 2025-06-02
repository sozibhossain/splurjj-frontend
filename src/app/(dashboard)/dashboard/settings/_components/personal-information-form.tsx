"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import UserProfile from "./user-profile"

interface PersonalInformationFormProps {
  onBack: () => void
}

export default function PersonalInformationForm({ onBack }: PersonalInformationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "Bessie",
    lastName: "Edwards",
    email: "darrellsteward@gmail.com",
    phone: "(307) 555-0133",
    country: "USA",
    cityState: "Alabama",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving personal information:", formData)
  }

  return (
    <div className="p-6">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
            <div className="text-sm text-gray-600">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <span className="mx-2">{">"}</span>
              <button onClick={onBack} className="hover:underline">
                Settings
              </button>
              <span className="mx-2">{">"}</span>
              <span>Personal Information</span>
            </div>
          </div>
          <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">
            Save
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="bg-blue-50/50 border-blue-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-blue-50/50 border-blue-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-blue-50/50 border-blue-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-blue-50/50 border-blue-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="bg-blue-50/50 border-blue-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cityState" className="text-sm font-medium text-gray-700">
                      City/State
                    </Label>
                    <Input
                      id="cityState"
                      value={formData.cityState}
                      onChange={(e) => handleInputChange("cityState", e.target.value)}
                      className="bg-blue-50/50 border-blue-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Section */}
          <div className="lg:col-span-1">
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  )
}
