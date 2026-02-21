"use client";

import { useState } from "react";
import { SiteWrapper } from "@/components/site-wrapper";
import { AnimatedSection } from "@/components/animated-section";
import { SuccessModal } from "@/components/success-modal";
import portfolioData from "@/data/portfolio.json";
import { Mail, Phone, Instagram, Send, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const { contact } = portfolioData;

const PREDEFINED_EVENTS = [
  "Wedding",
  "Engagement",
  "Pre-Wedding",
  "Birthday",
  "Modeling",
  "Other",
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    event: "",
    phone: "",
    customEvent: "",
    message: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCustomEvent, setIsCustomEvent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const selectedEvent = isCustomEvent
        ? formState.customEvent
        : formState.event;

      const templateParams = {
        name: formState.name,
        email: formState.email,
        event: selectedEvent,
        message: formState.message,
        phone: formState.phone,
        subject: `Inquiry from ${formState.name}`,
      };

      const result = await emailjs.send(
        "service_iqh3rcq", // e.g. service_xxxxx
        "template_r5zxpj6", // e.g. template_yyyyy
        templateParams,
        "ihkg2U02jRPDa7MZ9", // e.g. AbC123XYZ
      );

      if (result.status === 200) {
        setSubmittedName(formState.name);
        setShowSuccessModal(true);
        setFormState({
          name: "",
          email: "",
          event: "",
          phone: "",
          customEvent: "",
          message: "",
        });
        setIsCustomEvent(false);
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <SiteWrapper>
      <section className="pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">
              Get in Touch
            </p>
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
                <h2 className="font-serif text-2xl text-foreground">
                  {"Let's Connect"}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Whether you are planning your dream wedding, an intimate
                  engagement shoot, or a creative portfolio session, we would
                  love to hear from you.
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
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                        Email
                      </p>
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
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                        Phone
                      </p>
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
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                        Instagram
                      </p>
                      <p className="text-sm">{contact.instagramHandle}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 text-foreground">
                    <div className="w-12 h-12 flex items-center justify-center border border-border">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                        Location
                      </p>
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
                  <label
                    htmlFor="name"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Your Name
                  </label>
                  <motion.input
                    whileFocus={{ borderColor: "oklch(0.82 0.06 80)" }}
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ borderColor: "oklch(0.82 0.06 80)" }}
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                    placeholder="Enter Email Address"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="tel"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Phone Number
                  </label>
                  <motion.input
                    whileFocus={{ borderColor: "oklch(0.82 0.06 80)" }}
                    id="tel"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="event"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Event Type
                  </label>
                  {!isCustomEvent ? (
                    <div className="flex flex-col gap-3">
                      <select
                        id="event"
                        required
                        value={formState.event}
                        onChange={(e) => {
                          if (e.target.value === "custom") {
                            setIsCustomEvent(true);
                            setFormState((prev) => ({ ...prev, event: "" }));
                          } else {
                            setFormState((prev) => ({
                              ...prev,
                              event: e.target.value,
                            }));
                          }
                        }}
                        className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                      >
                        <option
                          value=""
                          className="bg-background text-foreground"
                        >
                          Select an event type...
                        </option>
                        {PREDEFINED_EVENTS.map((event) => (
                          <option
                            key={event}
                            value={event}
                            className="bg-background text-foreground"
                          >
                            {event}
                          </option>
                        ))}
                        <option
                          value="custom"
                          className="bg-background text-foreground"
                        >
                          Other (specify below)
                        </option>
                      </select>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <motion.input
                        whileFocus={{ borderColor: "oklch(0.82 0.06 80)" }}
                        type="text"
                        value={formState.customEvent}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            customEvent: e.target.value,
                          }))
                        }
                        className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                        placeholder="Enter your event type..."
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomEvent(false);
                          setFormState((prev) => ({
                            ...prev,
                            customEvent: "",
                          }));
                        }}
                        className="text-xs text-primary hover:text-primary/80 transition-colors mt-1"
                      >
                        Back to predefined options
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Your Message
                  </label>
                  <motion.textarea
                    whileFocus={{ borderColor: "oklch(0.82 0.06 80)" }}
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm tracking-widest uppercase mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      {/* <section className="border-t border-border/50">
        <div className="px-6 md:px-12 py-12">
          <div className="max-w-[1400px] mx-auto">
            <AnimatedSection className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                  Visit Us
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Located in Bangalore, we're ready to capture your most precious
                moments. Drop by our studio or reach out for consultations.
              </p>
            </AnimatedSection>
          </div>
        </div>

        <div className="px-6 md:px-12 pb-12">
          <div className="max-w-[1400px] mx-auto overflow-hidden rounded-lg border border-border/30">
            <iframe
              src="https://www.google.com/maps?q=https://maps.app.goo.gl/B2o8JX8kdV7pbnMf8&output=embed"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section> */}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        name={submittedName}
      />
    </SiteWrapper>
  );
}
