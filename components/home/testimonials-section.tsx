"use client"

import { AnimatedSection } from "@/components/animated-section"
import { Quote } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-card/30">
      <div className="max-w-[1400px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground text-balance">
            What Our Clients Say
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.15}>
              <div className="flex flex-col gap-6 p-8 border border-border/50 bg-card/50 backdrop-blur-sm h-full">
                <Quote className="w-8 h-8 text-primary/40" />
                <p className="text-muted-foreground leading-relaxed text-pretty flex-1">
                  {`"${t.text}"`}
                </p>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-serif text-foreground">{t.name}</p>
                  <p className="text-xs tracking-widest uppercase text-primary mt-1">{t.event}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
