"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Cinematic photography studio"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity }}
      >
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.1 }}
        >
          <motion.p
            className="text-sm md:text-base tracking-[0.5em] uppercase text-primary mb-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            Welcome to 50mm Photography
          </motion.p>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground text-balance leading-tight"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.2, duration: 1, ease: [0.77, 0, 0.175, 1] }}
          >
            Capturing Timeless
            <br />
            <span className="text-primary italic">Moments</span>
          </motion.h1>
        </div>

        <motion.p
          className="mt-6 text-muted-foreground text-lg md:text-xl max-w-xl text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.8 }}
        >
          Every frame tells a timeless story, naturally and beautiful.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8 }}
          className="mt-10"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 text-sm tracking-widest uppercase"
          >
            View Portfolio
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
