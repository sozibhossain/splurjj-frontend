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

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City/State is required"),
});

type FormData = z.infer<typeof formSchema>;

type FormDataWithImage = FormData & {
  profile_pic: string;
};

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

  const [profile_pic, setProfileImage] = useState<string>(""); // just filename
  const [previewUrl, setPreviewUrl] = useState<string>(""); // for preview
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl); // Preview image
      setProfileImage(file.name); // Just store the filename
    }
  };

  const handleImageRemove = () => {
    setPreviewUrl("");
    setProfileImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: FormData) => {
    const completeFormData: FormDataWithImage = {
      ...data,
      profile_pic: profile_pic,
    };
    console.log("Complete Form Data:", completeFormData);
    console.log(
      "Profile Image:",
      profile_pic ? profile_pic : "No image selected"
    );
  };

  return (
    <div className="min-h-screen p-4">
      <div className="">
        <div className="">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              Personal Information
            </h1>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6"
            >
              Save
            </Button>
          </div>

          <div className="flex gap-8">
            <div className="flex-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <FormLabel className="text-gray-700 font-medium">
                              {label}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type={type || "text"}
                                className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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

            <div className="flex flex-col items-center space-y-3">
              <div className="relative group">
                <div
                  className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={handleImageClick}
                >
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      width={120}
                      height={120}
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
