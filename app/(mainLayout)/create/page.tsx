"use client";
import { blogSchema } from "@/app/schemas/blog";
import { createPost } from "@/app/server-actions/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const page = () => {
  const [isPending, startTranstion] = useTransition();
  // const mutation = useMutation(api.blogPosts.createPosts);
  const formData = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  function handleSubmit(v: z.infer<typeof blogSchema>) {
    startTranstion(async () => {
      await createPost(v);
    });
  }
  return (
    <div>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-semibold text-4xl tracking-widest">
          Create your card
        </h1>
        <span className=" tracking-wider text-[#444444]">
          Start building your card!...
        </span>
        <Card className="w-full max-w-xl mx-auto mt-6">
          <CardHeader>
            <CardTitle>
              <span className="tracking-widest font-light">
                Create a wonderful card
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formData.handleSubmit(handleSubmit)}>
              <FieldGroup className="flex gap-4">
                <Controller
                  name="title"
                  control={formData.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        placeholder="..."
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="content"
                  control={formData.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        className="min-h-25"
                        placeholder="..."
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {/* add an invalid area and an error text */}{" "}
                <Button className="h-10">
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" /> Post blog...
                    </>
                  ) : (
                    <span>Post blog</span>
                  )}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
//  create a header, a card, a title, a field, input. with textarea and title

export default page;

// mutation({ title: v.title, content: v.content });
// formData.reset();
// toast.success("Card was created.");
