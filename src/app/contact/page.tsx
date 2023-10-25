import ContactForm from "@/components/contact-form";
import { LandingNavbar } from "@/components/landing-navbar";

export default function ContactPage() {
  return (
    <>
      <LandingNavbar />
      {/* Fix this spacing issue later */}
      <div className="h-160"></div>
      <ContactForm />
    </>
  );
}
