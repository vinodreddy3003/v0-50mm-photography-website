"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Instagram } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 py-4 max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="text-2xl font-serif tracking-wider text-foreground group-hover:text-primary transition-colors">
              50mm
            </span>
            <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
              Photography
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary"
                    layoutId="nav-underline"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/50mm_.photography?igsh=MXVmdW91M3N6dmJxcQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`text-3xl font-serif tracking-wider ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="https://www.instagram.com/50mm_.photography?igsh=MXVmdW91M3N6dmJxcQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              aria-label="Instagram"
            >
              <Instagram className="w-7 h-7" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
