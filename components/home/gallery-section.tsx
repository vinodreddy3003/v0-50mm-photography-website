"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"
import { ImageReveal } from "@/components/image-reveal"
import { Lightbox } from "@/components/lightbox"
import useSWR from "swr"
import portfolioData from "@/data/portfolio.json"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface GalleryImage {
  src: string
  alt: string
  title?: string
  category?: string
}

export function GallerySection() {
  const { data } = useSWR<{ images: GalleryImage[] }>("/api/images", fetcher, {
    refreshInterval: 30000,
  })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Merge default images with uploaded blob images
  const defaultImages: GalleryImage[] = portfolioData.defaultImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.title,
    category: img.category,
  }))

  const allImages = data?.images?.length ? data.images : defaultImages

  // Show only first 6 on home
  const displayImages = allImages.slice(0, 6)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground text-balance">
            Featured Gallery
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto text-pretty">
            A glimpse into our world of visual storytelling
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayImages.map((img, i) => (
            <AnimatedSection key={img.src + i} delay={i * 0.1}>
              <div className="group relative aspect-[4/5] overflow-hidden bg-muted">
                <ImageReveal
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onClick={() => openLightbox(i)}
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-end pointer-events-none">
                  <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-serif text-lg text-foreground">{img.title}</p>
                    {img.category && (
                      <p className="text-xs tracking-widest uppercase text-primary mt-1">
                        {img.category}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-500 text-sm tracking-widest uppercase"
          >
            View All Work
          </Link>
        </AnimatedSection>
      </div>

      <Lightbox
        images={displayImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % displayImages.length)}
      />
    </section>
  )
}
