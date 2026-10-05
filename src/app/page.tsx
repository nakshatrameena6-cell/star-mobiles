import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/animations/Marquee";
import { FeaturedDevices } from "@/components/home/FeaturedDevices";
import { BrandWall } from "@/components/home/BrandWall";
import { FindYourPhone } from "@/components/home/FindYourPhone";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { AccessoriesBand } from "@/components/home/AccessoriesBand";
import { OffersBand } from "@/components/home/OffersBand";
import { StoreSection } from "@/components/home/StoreSection";
import { TrustSection } from "@/components/home/TrustSection";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Star Mobiles | Smartphones, Accessories & Mobile Service in Coimbatore",
  description:
    "Your next phone starts here. Star Mobiles is a smartphone, accessories and mobile service store on Ramanadhapuram Main Road, Puliyakulam, Coimbatore. Call, WhatsApp or walk in.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Rhythmic pause between the statement and the catalogue */}
      <div className="border-y border-hair-dark bg-void py-5 sm:py-6">
        <Marquee />
      </div>

      <FeaturedDevices />
      <BrandWall />
      <FindYourPhone />
      <ServiceIndex />
      <AccessoriesBand />
      <OffersBand />
      <StoreSection />
      <TrustSection />
      <ContactSection />
    </>
  );
}
