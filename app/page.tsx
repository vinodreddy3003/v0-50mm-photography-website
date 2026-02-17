"use client"

import { SiteWrapper } from "@/components/site-wrapper"
import { HeroSection } from "@/components/home/hero-section"
import { GallerySection } from "@/components/home/gallery-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { InstagramSection } from "@/components/home/instagram-section"

export default function HomePage() {
  return (
    <SiteWrapper showLoading>
      <HeroSection />
      <GallerySection />
      <TestimonialsSection />
      <InstagramSection />
    </SiteWrapper>
  )
}
