"use client"

import { useState } from "react"
import { SiteWrapper } from "@/components/site-wrapper"
import { AnimatedSection } from "@/components/animated-section"
import portfolioData from "@/data/portfolio.json"
import { Mail, Phone, Instagram, Send, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const { contact } = portfolioData

const PREDEFINED_EVENTS = [
  "Wedding",
  "Engagement",
  "Pre-Wedding",
  "Birthday",
  "Modeling",
  "Other"
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    event: "",
    customEvent: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)
  const [isCustomEvent, setIsCustomEvent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedEvent = isCustomEvent ? formState.customEvent : formState.event

    // Send email using API
    const subject = encodeURIComponent(`Inquiry from ${formState.name}`)
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nEvent Type: ${selectedEvent}\n\nMessage:\n${formState.message}`
    )
    window.open(`mailto:50mmphotographyclicks@gmail.com?subject=${subject}&body=${body}`, "_self")
    
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: "", email: "", event: "", customEvent: "", message: "" })
      setIsCustomEvent(false)
    }, 3000)
  }

  return (
    <SiteWrapper showLoading>
      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">Get in Touch</p>
            <h1 className="text-5xl md:text-7xl font-serif text-foreground text-balance">
              Contact Us
            </h1>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto text-pretty">
              {"Let's create something beautiful together"}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact info */}
            <AnimatedSection>
              <div className="flex flex-col gap-8">
                <h2 className="font-serif text-2xl text-foreground">{"Let's Connect"}</h2>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Whether you are planning your dream wedding, an intimate engagement shoot, or
                  a creative portfolio session, we would love to hear from you.
                </p>

                <div className="flex flex-col gap-6 mt-4">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Email</p>
                      <p className="text-sm">{contact.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Phone</p>
                      <p className="text-sm">{contact.phone}</p>
                    </div>
                  </a>

                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Instagram</p>
                      <p className="text-sm">{contact.instagramHandle}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 text-foreground">
                    <div className="w-12 h-12 flex items-center justify-center border border-border">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Location</p>
                      <p className="text-sm">Bangalore, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection delay={0.2}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs tracking-widest uppercase text-muted-foreground">
                    Your Name
                  </label>
                  <motion.input
                    whileFocus={{ borderColor: "oklch(0.82 0.06 80)" }}
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs tracking-widest uppercase text-muted-foreground">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ borderColor: "oklch(0.82 0.06 80)" }}
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="event" className="text-xs tracking-widest uppercase text-muted-foreground">
                    Event Type
                  </label>
                  {!isCustomEvent ? (
                    <div className="flex flex-col gap-3">
                      <select
                        id="event"
                        value={formState.event}
                        onChange={(e) => {
                          if (e.target.value === "custom") {
                            setIsCustomEvent(true)
                            setFormState((prev) => ({ ...prev, event: "" }))
                          } else {
                            setFormState((prev) => ({ ...prev, event: e.target.value }))
                          }
                        }}
                        className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                      >
                        <option value="" className="bg-background text-foreground">Select an event type...</option>
                        {PREDEFINED_EVENTS.map((event) => (
                          <option key={event} value={event} className="bg-background text-foreground">
                            {event}
                          </option>
                        ))}
                        <option value="custom" className="bg-background text-foreground">Other (specify below)</option>
                      </select>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <motion.input
                        whileFocus={{ borderColor: "oklch(0.82 0.06 80)" }}
                        type="text"
                        value={formState.customEvent}
                        onChange={(e) => setFormState((prev) => ({ ...prev, customEvent: e.target.value }))}
                        className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                        placeholder="Enter your event type..."
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomEvent(false)
                          setFormState((prev) => ({ ...prev, customEvent: "" }))
                        }}
                        className="text-xs text-primary hover:text-primary/80 transition-colors mt-1"
                      >
                        Back to predefined options
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs tracking-widest uppercase text-muted-foreground">
                    Your Message
                  </label>
                  <motion.textarea
                    whileFocus={{ borderColor: "oklch(0.82 0.06 80)" }}
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                    className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm tracking-widest uppercase mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitted ? "Message Sent" : "Send Message"}
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-muted/30 flex items-center justify-center border-t border-border/50">
        <div className="text-center">
          <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">Bangalore, Karnataka, India</p>
        </div>
      </section>
    </SiteWrapper>
  )
}
