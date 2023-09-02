import { Hero } from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import WhyUseMixit from "@/components/sections/WhyUseMixit";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";
import Separator from "@/components/Separator";
import Navbar from "@/components/sections/Navbar";

export default function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <WhyUseMixit />
      <CallToAction />
      <Footer />
      <div className="relative w-full">
        <Separator
          color="gradient"
          height="15px"
          className="absolute bottom-0 w-screen"
        />
      </div>
    </>
  );
}
