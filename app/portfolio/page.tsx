"use client"

import { useState } from "react"
import { SiteWrapper } from "@/components/site-wrapper"
import { AnimatedSection } from "@/components/animated-section"
import { ImageReveal } from "@/components/image-reveal"
import { Lightbox } from "@/components/lightbox"
import useSWR from "swr"
import portfolioData from "@/data/portfolio.json"
import { motion, AnimatePresence } from "framer-motion"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface PortfolioImage {
  src: string
  alt: string
  title?: string
  category?: string
}

export default function PortfolioPage() {
  const { data } = useSWR<{ images: PortfolioImage[] }>("/api/images", fetcher, {
    refreshInterval: 30000,
  })
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const categories = [{ id: "all", name: "All" }, ...portfolioData.categories]

  const defaultImages: PortfolioImage[] = portfolioData.defaultImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.title,
    category: img.category,
  }))

  const allImages = data?.images?.length ? data.images : defaultImages
  const filteredImages =
    activeCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <SiteWrapper>
      <section className="pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection className="text-center">
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">Our Work</p>
            <h1 className="text-5xl md:text-7xl font-serif text-foreground text-balance">
              Portfolio
            </h1>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto text-pretty">
              Browse through our collection of stories told through the lens
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="px-6 md:px-12 mb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2 text-xs tracking-widest uppercase transition-colors ${
                  activeCategory === cat.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-primary"
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredImages.map((img, i) => (
                <div key={img.src + i} className="group relative aspect-[4/5] overflow-hidden bg-muted">
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
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-serif text-xl">
                No images in this category yet
              </p>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % filteredImages.length)
        }
      />
    </SiteWrapper>
  )
}
