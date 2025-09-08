import { ThemeToggleButton } from "@/components/theme-toggle-button"

import { NavBar } from "./landing-page/nav-bar"
import { Hero } from "./landing-page/hero"
import { PartnersSection }from "./landing-page/partners-section"
import { Benefits } from "./landing-page/benefits"
import { HowItWorks } from "./landing-page/how-it-works"
import { Pricing } from "./landing-page/pricing"
import { Testimonials } from "./landing-page/testimonials"
import { FAQ } from "./landing-page/faq"
import { CTA } from "./landing-page/cta"
import { Footer } from "./landing-page/footer"

export default function Home() {
  return (
    <div className="h-dvh w-dvw overflow-x-hidden">
      <NavBar />
      <Hero />
      <PartnersSection />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <ThemeToggleButton className="fixed left-4 bottom-4"/>
    </div>
  )
}
