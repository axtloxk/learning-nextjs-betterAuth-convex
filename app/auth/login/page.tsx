"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/app/schemas/auth";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const page = () => {
  const [isPending, startTransition] = useTransition();
  const formData = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      router.push("/blog");
      toast.success("Logged in successfully", { position: "bottom-left" });
    });
  }
  const router = useRouter();
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-gray-300/80 font-light">
          Welcome back. login to continue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formData.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4 p-4">
            <Controller
              name="email"
              control={formData.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Enter email</FieldLabel>
                  <Input {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={formData.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Enter password</FieldLabel>
                  <Input {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />{" "}
            <Button className="w-full h-9 mt-4" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" /> Login...
                </>
              ) : (
                <span>login</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default page;
