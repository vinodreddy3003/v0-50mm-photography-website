"use client"

import Link from "next/link"
import { Instagram, Mail, Phone } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

const { contact } = portfolioData

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex flex-col items-start">
              <span className="text-3xl font-serif tracking-wider text-foreground">
                50mm
              </span>
              <span className="text-xs tracking-[0.35em] uppercase text-muted-foreground">
                Photography
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              We capture real moments with emotion, simplicity, and soul.
              Every frame tells a timeless story, naturally and beautiful.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm tracking-widest uppercase text-foreground font-medium">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm tracking-widest uppercase text-foreground font-medium">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                {contact.phone}
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4 flex-shrink-0" />
                {contact.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-border/50 gap-4">
          <p className="text-xs text-muted-foreground">
            {"© 2026 50mm Photography. All rights reserved."}
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with passion for timeless moments
          </p>
        </div>
      </div>
    </footer>
  )
}
