"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

// Password validation schema
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const decodedEmail = decodeURIComponent(email || "");

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (values: { newPassword: string; email: string }) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      ).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      } else {
        toast.success(data?.message || "Email sent successfully!");
        router.push(`/login`);
      }
    },
  });

  // Form submission handler
  async function onSubmit(values: PasswordFormValues) {
    console.log(values);
    if (!decodedEmail) {
      toast.error("email is required");
      return;
    }
    mutate({ newPassword: values.password, email: decodedEmail });
  }

  return (
    <div className="">
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-[32px] px-[24px] rounded-lg bg-white/10  backdrop-blur-md"
        >
          {/* New Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#212121] font-normal text-base tracking-[0%] leading-[120%] font-poppins pb-2">
                  New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your New Password"
                      className="w-full md:w-[522px] h-[50px] border border-[#595959] rounded-[8px] text-lg font-normal font-poppins leading-[120%] pl-10 text-black placeholder:text-[#616161] bg-black/10 backdrop-blur-sm    outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                      {...field}
                    />
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[#212121]" />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-[#212121]" />
                      ) : (
                        <Eye className="h-5 w-5 text-[#212121]" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <div className="my-6">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212121] font-normal text-base tracking-[0%] leading-[120%] font-poppins pb-2">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter your Confirm Password"
                        className="w-full md:w-[522px] h-[50px] border border-[#595959] rounded-[8px] text-lg font-normal font-poppins leading-[120%] pl-10 text-black placeholder:text-[#616161] bg-black/10 backdrop-blur-sm    outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                        {...field}
                      />
                      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[#212121]" />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-[#212121]" />
                        ) : (
                          <Eye className="h-5 w-5 text-[#212121]" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full h-[52px] bg-[#34A1E8] rounded-[8px] py-[16px] px-[81px] text-lg font-semibold font-poppins leading-[120%] tracking-[0%] text-[#F4F4F4]"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Continue"}
          </button>
        </form>
      </Form>
    </div>
  );
}
