"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required for demo.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Demo authentication logic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (values.email === "admin@pernas.com") {
      toast({
        title: "Demo Admin Access",
        description: "Logging in to admin dashboard with demo data.",
      });
      router.push("/admin");
    } else if (values.email === "solicitor@pernas.com") {
      toast({
        title: "Demo Solicitor Access",
        description: "Logging in to solicitor dashboard with demo data.",
      });
      router.push("/solicitor");
    } else {
      toast({
        variant: "destructive",
        title: "Demo Access Only",
        description: "Please use the provided demo credentials.",
      });
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demo Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Use demo credentials above"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demo Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Any password works (demo)"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in to Demo"}
        </Button>
      </form>
    </Form>
  );
}