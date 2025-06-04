
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useRef } from "react";
import { Upload, X, Camera } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City/State is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function PersonalInfoForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "Bessie",
      last_name: "Edwards",
      email: "darrellsteward@gmail.com",
      phone: "(307) 555-0133",
      country: "USA",
      city: "Alabama",
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setSelectedFile(file);
    }
  };

  const handleImageRemove = () => {
    setPreviewUrl("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["personal-info"],
    mutationFn: async (formData: FormData) => {
      const data = new FormData();
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      
      // Append file if exists
      if (selectedFile) {
        data.append("profile_pic", selectedFile);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings/info`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    onSuccess:(data)=>{
      if(!data?.success){
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Profile info updated successfully");
      form.reset();
    }
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[106px]">
            <div className="md:col-span-3">
              <div className="flex items-center justify-between pb-8">
                <h1 className="text-2xl text-[#212121] font-poppins font-semibold leading-[120%] tracking-[0%]">
                  Personal Information
                </h1>
                <Button
                  type="submit"
                  size={"lg"}
                  disabled={isPending}
                  onClick={form.handleSubmit(onSubmit)}
                  className="h-[37px] text-white font-sm font-medium leading-[120%] tracking-[0%] font-poppins py-[10px] px-[26px] bg-[#34A1E8] rounded-[8px]"
                >
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                    {[
                      { name: "first_name", label: "First Name" },
                      { name: "last_name", label: "Last Name" },
                      { name: "email", label: "Email Address", type: "email" },
                      { name: "phone", label: "Phone" },
                      { name: "country", label: "Country" },
                      { name: "city", label: "City/State" },
                    ].map(({ name, label, type }) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name as keyof FormData}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                              {label}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type={type || "text"}
                                className="h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </form>
              </Form>
            </div>

            <div className="md:col-span-1 flex items-center justify-center">
              <div className="relative group">
                <div
                  className="w-[222px] h-[222px] rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={handleImageClick}
                >
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      width={222}
                      height={222}
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                </div>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}