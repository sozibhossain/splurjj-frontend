"use client";

import { useState } from "react";
import ProfileSidebar from "./profile-sidebar";
import PersonalInformation from "./personal-information";
import ChangePassword from "./change-password";

export default function AccountContainer() {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState("");

  const [userProfile, setUserProfile] = useState({
    firstName: "Bessie",
    lastName: "Edwards",
    email: "darrellsteward@gmail.com",
  });

  return (
    <div className="min-h-screen py-10 md:py-[60px] lg:py-[88px]">
      <h1 className="text-3xl md:text-[35px] lg:text-[40px] font-bold leading-[120%] tracking-[0%] text-[#131313] font-manrope text-center mb-6 md:mb-8 lg:mb-10">
        Accounts
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-[30px]">
        <div className="md:col-span-2 ">
          <ProfileSidebar
            userProfile={userProfile}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="md:col-span-5">
          {activeTab === "personal" && (
            <PersonalInformation
              userProfile={userProfile}
              setUserProfile={setUserProfile}
            />
          )}
          {activeTab === "password" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
}
