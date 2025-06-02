"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface ChangePasswordFormProps {
  onBack: () => void
}

export default function ChangePasswordForm({ onBack }: ChangePasswordFormProps) {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!")
      return
    }
    // Handle password change logic here
    console.log("Changing password")
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
              <span>Change Password</span>
            </div>
          </div>
          <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">
            Save
          </Button>
        </div>

        {/* Change Password Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwords.current}
                onChange={(e) => handleInputChange("current", e.target.value)}
                className="bg-blue-50/50 border-blue-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => handleInputChange("new", e.target.value)}
                  className="bg-blue-50/50 border-blue-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => handleInputChange("confirm", e.target.value)}
                  className="bg-blue-50/50 border-blue-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
