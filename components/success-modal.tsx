"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  name: string
}

export function SuccessModal({ isOpen, onClose, name }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-background border border-border rounded-lg p-8 max-w-md w-full shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 30 }}
              >
                <CheckCircle className="w-16 h-16 text-primary" />
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-serif text-foreground">Thank You, {name}!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your message has been received successfully. We appreciate your interest and will get back to you shortly.
              </p>
              <p className="text-xs text-muted-foreground">
                Expected response time: 24-48 hours
              </p>
            </motion.div>

            {/* Action button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={onClose}
              className="w-full mt-8 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm tracking-widest uppercase rounded"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
