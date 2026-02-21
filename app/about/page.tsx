"use client"

import Image from "next/image"
import { SiteWrapper } from "@/components/site-wrapper"
import { AnimatedSection } from "@/components/animated-section"
import { ImageReveal } from "@/components/image-reveal"
import portfolioData from "@/data/portfolio.json"
import { Camera, Eye, Heart, Sparkles } from "lucide-react"

const timeline = [
  { year: "2020", title: "The Beginning", desc: "50mm Photography was born from a passion for capturing authentic moments." },
  { year: "2021", title: "First Wedding", desc: "Shot our first full wedding, discovering the magic of documenting love stories." },
  { year: "2022", title: "Growing Team", desc: "Bhavani joined as Creative Partner, bringing fresh perspectives and artistic vision." },
  { year: "2023", title: "100+ Shoots", desc: "Crossed the milestone of 100 professional shoots across weddings, engagements, and modeling." },
  { year: "2024", title: "Studio Launch", desc: "Expanded into a dedicated studio space for controlled lighting and creative portrait sessions." },
  { year: "2025", title: "Editorial Work", desc: "Branched into fashion editorial and magazine-style shoots, pushing creative boundaries." },
]

const values = [
  { icon: Eye, title: "Vision", desc: "We see the beauty in raw, unscripted moments" },
  { icon: Heart, title: "Passion", desc: "Every shoot is a labor of love and dedication" },
  { icon: Camera, title: "Craft", desc: "Technical excellence meets artistic expression" },
  { icon: Sparkles, title: "Magic", desc: "Creating images that transcend ordinary photography" },
]

export default function AboutPage() {
  return (
    <SiteWrapper>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection className="text-center">
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">Our Story</p>
            <h1 className="text-5xl md:text-7xl font-serif text-foreground text-balance">
              About <span className="italic text-primary">50mm</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg text-pretty leading-relaxed">
              50mm Photography is a premium photography brand specializing in wedding, engagement,
              pre-wedding, birthday, modeling and creative shoots. We capture real moments with
              emotion, simplicity, and soul.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Cover image */}
      {/* <section className="px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ImageReveal
            src="/22 (1).png"
            alt="50mm Photography editorial work"
            width={1200}
            height={800}
            className="aspect-[16/10] w-full"
            priority
          />
        </div>
      </section> */}

      {/* Values */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">What Drives Us</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-4 p-8 border border-border/50 bg-card/30">
                  <v.icon className="w-8 h-8 text-primary" />
                  <h3 className="font-serif text-xl text-foreground">{v.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-12 px-6 md:px-12 bg-card/30">
        <div>
          {/* <AnimatedSection className="text-center mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">The Team</p>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              Meet the Creators
            </h2>
          </AnimatedSection> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {portfolioData.team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.2}>
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="relative w-64 h-72 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      fill
                      sizes="256px"
                      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">{member.name}</h3>
                    <p className="text-sm tracking-widest uppercase text-primary mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div> */}

          {/* Extended Team Images */}
          <div className="mt-20 pt-20 border-t border-border/30">
            <AnimatedSection className="text-center mb-16">
              <h3 className="text-3xl font-serif text-foreground">Our Creators</h3>
              <p className="text-muted-foreground mt-2">The visionaries behind 50mm</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Sairam - Camera */}
              <AnimatedSection delay={0.1}>
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="relative w-72 h-80 overflow-hidden rounded-lg group cursor-pointer">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0462.jpg-oLMngd2wVPqI1rXGH7D1VXfuqW89Fr.jpeg"
                      alt="Sairam - Photographer"
                      fill
                      sizes="288px"
                      className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-foreground">Sairam</h4>
                    <p className="text-sm tracking-widest uppercase text-primary mt-2">
                      Lead Photographer & Founder
                    </p>
                    <p className="text-xs text-muted-foreground mt-3 max-w-xs mx-auto">
                      The creative mind and technical expertise behind every frame
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Bhavani - Sitting */}
              <AnimatedSection delay={0.2}>
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="relative w-72 h-80 overflow-hidden rounded-lg group cursor-pointer">
                    <Image
                      src="/bhavani.jpeg"
                      alt="Bhavani - Creative Partner"
                      fill
                      sizes="288px"
                      className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-foreground">Bhavani</h4>
                    <p className="text-sm tracking-widest uppercase text-primary mt-2">
                      Creative Partner & Editor
                    </p>
                    <p className="text-xs text-muted-foreground mt-3 max-w-xs mx-auto">
                      Bringing artistic vision and storytelling to every project
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[800px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">Experience</h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border/50" />

            {timeline.map((item, i) => (
              <AnimatedSection
                key={item.year}
                delay={i * 0.1}
                className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2 z-10" />

                <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-primary font-serif text-lg">{item.year}</span>
                  <h3 className="font-serif text-xl text-foreground mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 text-pretty">{item.desc}</p>
                </div>

                <div className="hidden md:block flex-1" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </SiteWrapper>
  )
}
