import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with 50mm Photography for wedding, engagement, pre-wedding, birthday, and modeling shoots. Email us at 50mmphotographyclicks@gmail.com or call +91 9980400473.",
  openGraph: {
    title: "Contact | 50mm Photography",
    description: "Let's create something beautiful together. Reach out for booking inquiries.",
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630, alt: "Contact 50mm Photography" }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
