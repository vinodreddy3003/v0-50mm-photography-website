"use client"

import { useState, useEffect } from "react"
import { SiteWrapper } from "@/components/site-wrapper"
import { AnimatedSection } from "@/components/animated-section"
import { ImageReveal } from "@/components/image-reveal"
import { Lightbox } from "@/components/lightbox"
import useSWR from "swr"
import { motion, AnimatePresence } from "framer-motion"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface PortfolioImage {
  id: string
  src: string
  alt: string
  title?: string
}

const PORTFOLIO_CATEGORIES = [
  { id: "engagement", name: "Engagement" },
  { id: "wedding", name: "Wedding" },
  { id: "prewedding", name: "Pre-Wedding" },
  { id: "modeling", name: "Modeling" },
  { id: "birthday", name: "Birthday" },
  { id: "other", name: "Other" },
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("engagement")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [images, setImages] = useState<PortfolioImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCategoryImages = async () => {
      setIsLoading(true)
      try {
        const data = await import(`@/data/portfolio-${selectedCategory}.json`)
        setImages(data.default.images)
      } catch (error) {
        console.error("Failed to load portfolio category:", error)
        setImages([])
      } finally {
        setIsLoading(false)
      }
    }

    loadCategoryImages()
  }, [selectedCategory])

  const currentCategory = PORTFOLIO_CATEGORIES.find((cat) => cat.id === selectedCategory)

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

      {/* Category Navigation */}
      <section className="px-6 md:px-12 mb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  selectedCategory === cat.id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                key={selectedCategory}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {images.map((img, i) => (
                  <div key={img.id} className="group relative aspect-[4/5] overflow-hidden bg-muted">
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
                        <p className="text-xs tracking-widest uppercase text-primary mt-1">
                          {currentCategory?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!isLoading && images.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-serif text-xl">
                No images in this category yet
              </p>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % images.length)
        }
      />
    </SiteWrapper>
  )
}
