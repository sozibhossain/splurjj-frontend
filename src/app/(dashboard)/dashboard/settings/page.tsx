"use client"

import { useState } from "react"
import PersonalInformationForm from "./_components/personal-information-form"
import ChangePasswordForm from "./_components/change-password-form"
import SettingsMenu from "./_components/settings-menu"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  if (activeSection === "personal") {
    return <PersonalInformationForm onBack={() => setActiveSection(null)} />
  }

  if (activeSection === "password") {
    return <ChangePasswordForm onBack={() => setActiveSection(null)} />
  }

  return <SettingsMenu onSectionSelect={setActiveSection} />
}
