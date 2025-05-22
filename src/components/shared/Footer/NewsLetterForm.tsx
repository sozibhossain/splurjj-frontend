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
          className="w-full flex items-center gap-1 lg:gap-2"
        >
          <div className="w-2/3 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full h-[50px] !rounded-none bg-white text-base text-black leading-normal placeholder:text-black"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <button
              className="w-full h-[50px] bg-blue-500 text-white py-2 px-2 rounded-[8px] text-lg font-medium leading-normal "
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
