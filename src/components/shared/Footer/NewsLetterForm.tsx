"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

const NewsLetterForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex items-center"
        >
          <div className=" ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[149px] h-[40px] rounded-l-[8px] rounded-r-none bg-white text-base text-black leading-normal placeholder:text-black"
                      placeholder="Enter Your Email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <button
              className="w-[127px] h-[40px] bg-[#0253F7] text-[#F2F2F2] rounded-r-[8px] text-lg font-bold font-manrope leading-normal "
              type="submit"
            >
              Subscribe
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewsLetterForm;
