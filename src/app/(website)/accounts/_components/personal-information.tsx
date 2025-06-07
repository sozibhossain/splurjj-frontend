"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { SquarePen } from "lucide-react"

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  country: z.string().min(2, "Country is required"),
  cityState: z.string().min(2, "City/State is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
})

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

interface UserProfile {
  firstName: string
  lastName: string
  email: string
}

interface PersonalInformationProps {
  userProfile: UserProfile
  setUserProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void
}

// Fetch user profile data
const fetchUserProfile = async (): Promise<PersonalInfoFormValues> => {
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

// Update user profile
const updateUserProfile = async (data: PersonalInfoFormValues): Promise<PersonalInfoFormValues> => {
  try {
    const response = await fetch("https://dynamic-splurjj.scaleupdevagency.com/api/settings/info", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}`, // Add auth token when available
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication required. Please login again.")
      } else if (response.status === 422) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Validation error. Please check your input.")
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.")
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Update failed with status ${response.status}`)
      }
    }

    const responseData = await response.json()
    return responseData.data || responseData
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error("Network error. Please check your connection.")
    }
  }
}

export default function PersonalInformation({ userProfile, setUserProfile }: PersonalInformationProps) {
  const queryClient = useQueryClient()

  // Fetch user profile data
  const {
    data: profileData,
    // isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  // Update user profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      // Update the cached data
      queryClient.setQueryData(["userProfile"], data)

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      console.log("Profile updated successfully:", data)
    },
    onError: (error: Error) => {
      let errorMessage = "Failed to update profile. Please try again."

      if (error.message.includes("Authentication")) {
        errorMessage = "Please login again to update your profile."
      } else if (error.message.includes("Validation")) {
        errorMessage = "Please check your input and try again."
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
      console.error("Error updating profile:", error)
    },
  })

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      phone: "(307) 555-0133",
      country: "USA",
      cityState: "California",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      postalCode: "15268959",
    },
  })

  // Update form when profile data is fetched
  useEffect(() => {
    if (profileData) {
      form.reset(profileData)
    }
  }, [profileData, form])

  // Show error toast if profile fetch fails
  useEffect(() => {
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

  // Watch for changes in firstName, lastName, and email to update parent state instantly
  const firstName = form.watch("firstName")
  const lastName = form.watch("lastName")
  const email = form.watch("email")

  useEffect(() => {
    if (firstName && lastName && email) {
      setUserProfile({
        firstName,
        lastName,
        email,
      })
    }
  }, [firstName, lastName, email, setUserProfile])

  function onSubmit(data: PersonalInfoFormValues) {
    updateProfileMutation.mutate(data)
  }

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <div className="text-lg">Loading profile...</div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-[22px] lg:text-[24px] font-manrope font-semibold leading-[120%] tracking-[0%] text-[#131313]">Personal Information</h2>
        <Button
          className="w-[124px] h-[39px] rounded-[8px] bg-[#0253F7] hover:bg-blue-700 text-white text-base font-bold leading-[120%] tracking-[0%] px-[21px] py-[10px]"
          onClick={form.handleSubmit(onSubmit)}
          disabled={updateProfileMutation.isPending}
        >
         <SquarePen /> {updateProfileMutation.isPending ? "Updating..." : "Update"}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 lg:gap-[30px]">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">First Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 lg:gap-[30px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">Phone</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 lg:gap-[30px]">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">Country</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cityState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">City/State</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">Road/Area</FormLabel>
                <FormControl>
                   <Input {...field} className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">Postal Code</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
