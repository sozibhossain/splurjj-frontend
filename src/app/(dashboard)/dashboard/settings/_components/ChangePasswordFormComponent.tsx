"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const formSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_new_password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords do not match",
    path: ["confirm_new_password"],
  });

export default function ChangePasswordFormComponent() {
    const session = useSession();
    const token = (session?.data?.user as { token: string })?.token;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: (values: z.infer<typeof formSchema>) =>
      fetch(
        `https://dynamic-splurjj.scaleupdevagency.com/api/settings/password`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      ).then((res) => res.json()),
      onSuccess: (data)=>{
        if(!data?.success){
            toast.error(data?.message || "Something went wrong");
            return
        }
        toast.success(data?.message || "Password changed successfully");
        form.reset();
      }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values)
  }

  return (
    <div className="">
      <div className="flex justify-end items-center mb-4">
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="h-[44px] text-white font-sm font-medium leading-[120%] tracking-[0%] font-poppins py-[13px] px-[28px] bg-[#34A1E8] rounded-[8px]"
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
      <h2 className="text-2xl text-[#212121] font-poppins font-semibold leading-[120%] tracking-[0%] pb-8">
        Change Password
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                  Current Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your current password"
                    className="w-full h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                      {...field}
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
