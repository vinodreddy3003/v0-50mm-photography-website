import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse our portfolio of wedding, engagement, pre-wedding, birthday, and modeling photography. Each frame tells a unique story.",
  openGraph: {
    title: "Portfolio | 50mm Photography",
    description: "Stories told through the lens - wedding, engagement, modeling and creative shoots.",
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630, alt: "50mm Photography Portfolio" }],
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
