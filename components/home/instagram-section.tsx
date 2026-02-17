"use client"

import { AnimatedSection } from "@/components/animated-section"
import { Instagram } from "lucide-react"
import Image from "next/image"
import portfolioData from "@/data/portfolio.json"

export function InstagramSection() {
  const images = portfolioData.defaultImages.slice(0, 5)

  return (
    <section className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <AnimatedSection className="text-center mb-12">
          <a
            href={portfolioData.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-6 h-6" />
            <span className="font-serif text-2xl">{portfolioData.contact.instagramHandle}</span>
          </a>
          <p className="mt-2 text-sm text-muted-foreground">Follow us for behind-the-scenes</p>
        </AnimatedSection>

        <div className="flex gap-3 overflow-hidden">
          {images.map((img, i) => (
            <AnimatedSection key={img.id} delay={i * 0.1} className="flex-1 min-w-0">
              <a
                href={portfolioData.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-all duration-500 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
