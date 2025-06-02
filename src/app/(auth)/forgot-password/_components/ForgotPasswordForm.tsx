"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ✅ Zod Schema
const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (email: string) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/password/email`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      }).then((res) => res.json()),
    onSuccess: (data, email) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Email sent Successfully");
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    },
  });

  // ✅ Handle submit
  async function onSubmit(data: LoginFormValues) {
    console.log(data);
    mutate(data.email);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-[32px] px-[24px] rounded-lg bg-white/10  backdrop-blur-md"
      >
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#212121] font-normal text-base tracking-[0%] leading-[120%] font-poppins pb-2">
                Email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    type="email"
                    className="w-full md:w-[522px] h-[50px] border border-[#595959] rounded-[8px] text-base font-normal font-poppins leading-[120%] pl-10 text-black placeholder:text-[#616161] bg-black/10 backdrop-blur-sm    outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                  />
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-black" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full h-[51px] bg-[#34A1E8] rounded-[8px] text-base font-bold tracking-[0%] font-poppins text-white "
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </form>
    </Form>
  );
}
