import React from "react";
import * as Form from "@radix-ui/react-form";
import { Button } from "./ui/button";
import { cn } from "../../lib/utils";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

interface ContactFormProps
  extends Form.FormProps,
    React.HTMLAttributes<HTMLFormElement> {}

const ContactForm = ({ className, ...props }: ContactFormProps) => (
  <Form.Root className={cn("flex flex-col gap-16", className)} {...props}>
    <Form.Field name="name">
      <div className="mb-4">
        <Form.Label className="text-base font-bold text-body">Name</Form.Label>
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
        <Form.Label className="text-base font-bold text-body">Email</Form.Label>
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
          minRows={5}
          required
          style={{ resize: "none" }}
        />
      </Form.Control>

      <Form.Message match="valueMissing" className="text-danger">
        Please enter your message
      </Form.Message>
    </Form.Field>

    <Form.Submit asChild>
      <Button className="w-full" type="submit">
        Send message
      </Button>
    </Form.Submit>
  </Form.Root>
);

export default ContactForm;
