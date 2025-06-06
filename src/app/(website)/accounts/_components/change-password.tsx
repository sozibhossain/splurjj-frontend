"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

// Change password API function
const changePassword = async (
  data: PasswordFormValues
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(
      "https://dynamic-splurjj.scaleupdevagency.com/api/settings/change-password",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${token}`, // Add auth token when available
        },
        body: JSON.stringify({
          current_password: data.currentPassword,
          new_password: data.newPassword,
          new_password_confirmation: data.confirmPassword,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication required. Please login again.");
      } else if (response.status === 422) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Current password is incorrect");
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Password change failed`);
      }
    }

    const responseData = await response.json();
    return responseData.data || { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};

export default function ChangePassword() {
  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      form.reset();
    },
    onError: (error: Error) => {
      let errorMessage = "Failed to change password. Please try again.";

      if (error.message.includes("Authentication")) {
        errorMessage = "Please login again to change your password.";
      } else if (error.message.includes("incorrect")) {
        errorMessage = "Current password is incorrect. Please try again.";
      } else if (error.message.includes("Server error")) {
        errorMessage =
          "Server is temporarily unavailable. Please try again in a few minutes.";
      } else if (error.message.includes("Network")) {
        errorMessage = "Please check your internet connection and try again.";
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: PasswordFormValues) {
    changePasswordMutation.mutate(data);
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-6 md:mb-8 lg:mb-10">
        <Button
          className="w-[160px] h-[51px] rounded-[8px] bg-[#0253F7] hover:bg-blue-700 text-white font-manrope font-bold leading-[120%] tracking-[0%] px-[61px] py-[16px]"
          onClick={form.handleSubmit(onSubmit)}
          disabled={changePasswordMutation.isPending}
        >
          {changePasswordMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
      <div className="flex justify-between items-center my-6 md:my-8">
        <h2 className="text-xl md:text-[22px] lg:text-2xl font-semibold text-[#131313] leading-[120%] tracking-[0%] font-manrope">
          Change password
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">
                  Current Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="##############"
                    {...field}
                    className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="##############"
                      {...field}
                      className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-[17px] lg:text-lg font-manrope font-medium leading-[120%] tracking-[0%] text-[#131313]">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="##############"
                      {...field}
                      className="w-full h-[56px] border border-[#645949] rounded-[8px] text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#131313] placeholder:text-[#616161]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
