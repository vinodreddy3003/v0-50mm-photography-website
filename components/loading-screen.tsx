"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* Aperture blades animation */}
          <div className="relative w-24 h-24 mb-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ rotate: i * 60, scale: 0 }}
                animate={{ rotate: i * 60, scale: 1 }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.6,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <div
                  className="w-full h-[2px] bg-primary absolute top-1/2 left-0"
                  style={{ transformOrigin: "center" }}
                />
              </motion.div>
            ))}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-primary" />
            </motion.div>
          </div>

          {/* Logo text reveal */}
          <motion.div className="overflow-hidden">
            <motion.h1
              className="text-4xl md:text-5xl font-serif tracking-widest text-foreground"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            >
              50mm
            </motion.h1>
          </motion.div>
          <motion.div className="overflow-hidden">
            <motion.p
              className="text-sm tracking-[0.4em] uppercase text-muted-foreground mt-2"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            >
              Photography
            </motion.p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="w-40 h-[1px] bg-border mt-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 2, duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
