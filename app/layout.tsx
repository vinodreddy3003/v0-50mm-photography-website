import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: {
    default: "50mm Photography | Capturing Timeless Moments",
    template: "%s | 50mm Photography",
  },
  description:
    "Premium photography brand specializing in wedding, engagement, pre-wedding, birthday, modeling and creative shoots. We capture real moments with emotion, simplicity, and soul.",
  keywords: [
    "photography",
    "wedding photography",
    "engagement shoots",
    "pre-wedding",
    "modeling",
    "50mm photography",
    "professional photographer",
  ],
  authors: [{ name: "50mm Photography" }],
  creator: "50mm Photography",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://50mmphotography.com",
    siteName: "50mm Photography",
    title: "50mm Photography | Capturing Timeless Moments",
    description:
      "Premium photography brand specializing in wedding, engagement, pre-wedding, birthday, modeling and creative shoots.",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "50mm Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "50mm Photography | Capturing Timeless Moments",
    description:
      "Premium photography brand specializing in wedding, engagement, pre-wedding, birthday, modeling and creative shoots.",
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
