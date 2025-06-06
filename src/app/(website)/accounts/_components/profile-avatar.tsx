"use client"

import React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import { toast } from "react-toastify"

interface ProfileAvatarProps {
  profileImage: string
  setProfileImage: (image: string) => void
  userName: string
}

interface UserProfileData {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImage?: string
  phone?: string
  country?: string
  cityState?: string
  address?: string
  postalCode?: string
}

// Fetch user profile data
const fetchUserProfile = async (): Promise<UserProfileData> => {
  try {
    const response = await fetch("https://dynamic-splurjj.scaleupdevagency.com/api/settings/info", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}`, // Add auth token when available
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication required. Please login again.")
      } else if (response.status === 404) {
        throw new Error("Profile data not found.")
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.")
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Failed to fetch profile data`)
      }
    }

    const data = await response.json()
    return data.data || data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error("Network error. Please check your connection.")
    }
  }
}

// Upload profile image
const uploadProfileImage = async (file: File): Promise<{ imageUrl: string }> => {
  try {
    const formData = new FormData()
    formData.append("image", file)
    formData.append("type", "profile_avatar")

    const response = await fetch("https://dynamic-splurjj.scaleupdevagency.com/api/settings/info", {
      method: "POST",
      headers: {
        Accept: "application/json",
        // 'Authorization': `Bearer ${token}`, // Add auth token when available
      },
      body: formData,
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication required. Please login again.")
      } else if (response.status === 404) {
        throw new Error("Upload endpoint not found. Please contact support.")
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.")
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Upload failed with status ${response.status}`)
      }
    }

    const data = await response.json()

    if (data.imageUrl) {
      return { imageUrl: data.imageUrl }
    } else if (data.url) {
      return { imageUrl: data.url }
    } else if (data.data?.imageUrl) {
      return { imageUrl: data.data.imageUrl }
    } else {
      const reader = new FileReader()
      return new Promise((resolve) => {
        reader.onload = (e) => {
          resolve({ imageUrl: e.target?.result as string })
        }
        reader.readAsDataURL(file)
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error("Network error. Please check your connection and try again.")
    }
  }
}

export default function ProfileAvatar({ profileImage, setProfileImage, userName }: ProfileAvatarProps) {
  const queryClient = useQueryClient()

  // Fetch user profile data
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  // Upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      setProfileImage(data.imageUrl)

      // Update the cached profile data
      queryClient.setQueryData(["userProfile"], (oldData: UserProfileData | undefined) => {
        if (oldData) {
          return { ...oldData, profileImage: data.imageUrl }
        }
        return oldData
      })

      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ["userProfile"] })

      toast.success("Profile image updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    },
    onError: (error: Error) => {
      let errorMessage = "Failed to upload image. Please try again."

      if (error.message.includes("Authentication")) {
        errorMessage = "Please login again to upload your profile image."
      } else if (error.message.includes("not found")) {
        errorMessage = "Upload service is currently unavailable. Please contact support."
      } else if (error.message.includes("Server error")) {
        errorMessage = "Server is temporarily unavailable. Please try again in a few minutes."
      } else if (error.message.includes("Network")) {
        errorMessage = "Please check your internet connection and try again."
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      console.error("Error uploading image:", error)
    },
  })

  // Show error toast if profile fetch fails
  React.useEffect(() => {
    if (error) {
      toast.error("Failed to load profile data. Please refresh the page.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }, [error])

  // Update profile image when data is fetched
  React.useEffect(() => {
    if (profileData?.profileImage && profileData.profileImage !== profileImage) {
      setProfileImage(profileData.profileImage)
    }
  }, [profileData, profileImage, setProfileImage])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return
      }

      uploadImageMutation.mutate(file)
    }
  }

  const triggerImageUpload = () => {
    if (!uploadImageMutation.isPending && !isLoading) {
      document.getElementById("imageUpload")?.click()
    }
  }

  // Show loading state
  
  // if (isLoading) {
  //   return (
  //     <div className="relative inline-block">
  //       <Avatar className="w-24 h-24 mx-auto mb-4 opacity-50">
  //         <AvatarImage src={profileImage || "/placeholder.svg"} alt={userName} />
  //         <AvatarFallback>
  //           {userName
  //             .split(" ")
  //             .map((n) => n[0])
  //             .join("")
  //             .toUpperCase()}
  //         </AvatarFallback>
  //       </Avatar>
  //       <div className="absolute inset-0 flex items-center justify-center">
  //         <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">Loading...</div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="relative inline-block">
      <Avatar
        className={`w-[150px] h-[150px] rounded-full mx-auto mb-4 cursor-pointer border ${uploadImageMutation.isPending ? "opacity-50" : ""}`}
        onClick={triggerImageUpload}
      >
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
        className={`absolute bottom-4 right-0 bg-gray-600 rounded-full p-1 cursor-pointer hover:bg-gray-700 transition-colors ${
          uploadImageMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={triggerImageUpload}
      >
        <Camera className="w-4 h-4 text-white" />
      </div>
      {uploadImageMutation.isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">Uploading...</div>
        </div>
      )}
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        disabled={uploadImageMutation.isPending || isLoading}
      />
    </div>
  )
}
