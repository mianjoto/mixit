"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";
import { Button } from "./ui/button";
import { cn } from "../../lib/utils";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContactFormInputs, ContactFormSchema } from "@/../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmail } from "@/app/_actions";
import { useToast } from "@/hooks/useToast";

interface ContactFormProps
  extends Form.FormProps,
    React.HTMLAttributes<HTMLFormElement> {}

const ContactForm = ({ className, ...props }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
  });

  const { toast } = useToast();

  const processForm: SubmitHandler<ContactFormInputs> = async (data) => {
    const result = await sendEmail(data);

    if (result?.success) {
      toast({ title: "✅ Success!", description: "Your email was sent." });
      reset();
      return;
    }

    toast({
      title: "😑 Something went wrong...",
      description: "Please try again in a moment.",
      variant: "destructive",
    });
  };

  return (
    <Form.Root
      className={cn("flex flex-col gap-16", className)}
      onSubmit={handleSubmit(processForm)}
      autoComplete="off"
      {...props}
    >
      <Form.Field name="name">
        <div className="mb-4">
          <Form.Label className="text-base font-bold text-body">
            Name
          </Form.Label>
        </div>
        <Form.Control
          className="w-full rounded-[8px] bg-secondary px-12 py-8 text-body"
          asChild
        >
          <input
            type="name"
            className="placeholder:text-gray"
            placeholder="Enter your name"
            required
            autoComplete="off"
            {...register("name")}
          />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-danger">
          Please enter your name
        </Form.Message>
        <Form.Message match="typeMismatch" className="text-danger">
          Please provide a valid name
        </Form.Message>
      </Form.Field>

      <Form.Field name="email">
        <div className="mb-4">
          <Form.Label className="text-base font-bold text-body">
            Email
          </Form.Label>
        </div>
        <Form.Control
          className="w-full rounded-[8px] bg-secondary px-12 py-8 text-body"
          asChild
        >
          <input
            type="email"
            className="placeholder:text-gray"
            placeholder="Enter your email address"
            required
            autoComplete="off"
            {...register("email")}
          />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-danger">
          Please enter your email
        </Form.Message>
        <Form.Message match="typeMismatch" className="text-danger">
          Please provide a valid email
        </Form.Message>
      </Form.Field>

      <Form.Field name="question">
        <div className="mb-4">
          <Form.Label className="text-base font-bold text-body">
            Message
          </Form.Label>
        </div>
        <Form.Control
          className="w-full rounded-[8px] bg-secondary px-12 py-8 text-body"
          asChild
        >
          <TextareaAutosize
            className="placeholder:text-gray"
            placeholder="Enter your message (500 characters)"
            maxLength={500}
            minLength={6}
            minRows={5}
            required
            style={{ resize: "none" }}
            {...register("message")}
          />
        </Form.Control>

        <Form.Message match="valueMissing" className="text-danger">
          Please enter your message
        </Form.Message>
        <Form.Message match="tooShort" className="text-danger">
          Please enter at least 6 characters
        </Form.Message>
      </Form.Field>

      <Form.Submit asChild>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending message..." : "Send message"}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default ContactForm;
