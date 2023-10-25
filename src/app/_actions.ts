"use server";

import { Resend } from "resend";
import { ContactFormInputs, ContactFormSchema } from "@/../lib/schema";
import ContactFormEmail from "@/emails/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY as string);
const contactEmailEndpoint = process.env.RESEND_EMAIL_ENDPOINT as string;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.success) {
    const { name, email, message } = result.data;
    try {
      const data = await resend.emails.send({
        from: "Contact form <contact@mixit.fm>",
        to: ["Miguel Jover <mianjoto@gmail.com>"],
        subject: "Contact form submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        react: ContactFormEmail({ name, email, message }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format };
  }
}
