"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

interface ImageRevealProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  onClick?: () => void
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  onClick,
}: ImageRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* Gold mask overlay that wipes away */}
      <motion.div
        className="bg-primary"
        style={{ position: "absolute", inset: 0, zIndex: 10, transformOrigin: "right" }}
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
      />

      {/* Animated image container */}
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
      >
        {fill ? (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
              className="object-cover"
              priority={priority}
            />
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 600}
            sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
            className="object-cover w-full h-full"
            priority={priority}
          />
        )}
      </motion.div>
    </div>
  )
}
