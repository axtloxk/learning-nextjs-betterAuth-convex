"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/app/schemas/auth";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const page = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const formData = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof signUpSchema>) {
    startTransition(async () => {
      await authClient.signUp.email({
        email: data.email,
        name: data.fullName,
        password: data.password,
      });
      router.push("/");
      toast.success("done successfully");
    });
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-gray-200/50">
          You have to sign up to continue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formData.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4 p-4">
            <Controller
              name="fullName"
              control={formData.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Enter full name</FieldLabel>
                  <Input {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                  <Loader2 className="animate-spin" /> Sign up...
                </>
              ) : (
                <span>Sign up</span>
              )}
            </Button>{" "}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default page;
