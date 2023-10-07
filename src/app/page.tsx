import { Hero } from "@/components/hero";
import Features from "@/components/features";
import WhyUseMixit from "@/components/why-use-mixit";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";
import Separator from "@/components/ui/separator";
import { LandingNavbar } from "@/components/landing-navbar";

export default function Index() {
  return (
    <>
      <LandingNavbar />
      <Hero />
      <Features />
      <WhyUseMixit />
      <CallToAction />
      <Footer />
      <div className="relative w-full">
        <Separator
          color="gradient"
          horizontalHeight="15px"
          className="absolute bottom-0 w-screen"
        />
      </div>
    </>
  );
}
