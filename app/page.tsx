import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import TrustedBy from "@/components/landing/trusted-by";
import Features from "@/components/landing/features";
import Showcase from "@/components/landing/showcase";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import Footer from "@/components/landing/footer";
import app from "@/services/firebase";

export default function Home() {

  console.log(app);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <Showcase />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}