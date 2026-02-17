"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
  images: { src: string; alt: string; title?: string }[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }: LightboxProps) {
  if (!images.length) return null
  const current = images[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-background/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-10"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-foreground hover:text-primary transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); onPrev() }}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-foreground hover:text-primary transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); onNext() }}
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          <motion.div
            key={currentIndex}
            className="w-[90vw] h-[80vh] max-w-5xl"
            style={{ position: "relative" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
            {current.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-background/70 backdrop-blur-md p-4 text-center">
                <p className="font-serif text-lg text-foreground">{current.title}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
