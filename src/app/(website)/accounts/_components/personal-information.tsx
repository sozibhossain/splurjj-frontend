"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"

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

export default function PersonalInformation({ userProfile, setUserProfile }: PersonalInformationProps) {
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

  // Watch for changes in firstName, lastName, and email to update parent state
  const watchedValues = form.watch(["firstName", "lastName", "email"])

  useEffect(() => {
    const [firstName, lastName, email] = watchedValues
    if (firstName && lastName && email) {
      setUserProfile({
        firstName,
        lastName,
        email,
      })
    }
  }, [watchedValues, setUserProfile])

  function onSubmit(data: PersonalInfoFormValues) {
    console.log("Personal information updated:", data)
    // Handle form submission here
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6" onClick={form.handleSubmit(onSubmit)}>
          Update
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
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
                  <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="w-full" />
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
                  <FormLabel className="text-sm font-medium text-gray-700">Phone</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Country</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
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
                  <FormLabel className="text-sm font-medium text-gray-700">City/State</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
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
                <FormLabel className="text-sm font-medium text-gray-700">Road/Area</FormLabel>
                <FormControl>
                  <Textarea {...field} className="w-full min-h-[80px] resize-none" />
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
                <FormLabel className="text-sm font-medium text-gray-700">Postal Code</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full" />
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
