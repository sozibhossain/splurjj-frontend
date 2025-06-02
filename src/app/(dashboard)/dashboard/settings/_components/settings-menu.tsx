"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface SettingsMenuProps {
  onSectionSelect: (section: string) => void
}

export default function SettingsMenu({ onSectionSelect }: SettingsMenuProps) {
  return (
    <div className="p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <div className="text-sm text-gray-600">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <span className="mx-2">{">"}</span>
            <span>Settings</span>
          </div>
        </div>

        {/* Settings Options */}
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full justify-between p-6 h-auto text-left hover:bg-white/50"
                onClick={() => onSectionSelect("personal")}
              >
                <span className="text-lg font-medium text-gray-800">Personal Information</span>
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full justify-between p-6 h-auto text-left hover:bg-white/50"
                onClick={() => onSectionSelect("password")}
              >
                <span className="text-lg font-medium text-gray-800">Change Password</span>
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
