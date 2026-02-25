import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://50mmphotography.in"),

  title: {
    default: "50mm Photography | Wedding, Pre-Wedding & Creative Shoots",
    template: "%s | 50mm Photography",
  },

  description:
    "50mm Photography is a premium photography studio specializing in wedding, engagement, pre-wedding, birthday, modeling, and creative shoots. We capture timeless moments with emotion and elegance.",

  keywords: [
    // Brand
    "50mm photography",
    "50mm photography studio",
    "50mm photography India",

    // Core services
    "wedding photography",
    "wedding photographer",
    "wedding photographer in India",
    "pre wedding photography",
    "pre wedding photoshoot",
    "engagement photography",
    "engagement photoshoot",
    "birthday photography",
    "birthday photoshoot",
    "event photography",
    "corporate event photography",
    "party photography",
    "anniversary photoshoot",
    "baby photoshoot",
    "maternity photoshoot",
    "kids photography",

    // Styles & genres
    "candid wedding photography",
    "candid photography",
    "cinematic wedding photography",
    "cinematic photoshoot",
    "creative photography",
    "artistic photography",
    "fine art photography",
    "portrait photography",
    "couple photoshoot",
    "bridal photoshoot",
    "groom photoshoot",
    "traditional wedding photography",
    "modern wedding photography",
    "editorial photography",
    "lifestyle photography",

    // Portfolio / modeling
    "modeling portfolio shoot",
    "model portfolio photography",
    "fashion photography",
    "portfolio photoshoot",
    "actor portfolio photoshoot",
    "actress portfolio photoshoot",
    "personal branding photoshoot",
    "professional headshots",
    "corporate headshots",

    // Location & intent based
    "professional photographer",
    "professional photographer in India",
    "best wedding photographer",
    "top wedding photographer",
    "affordable wedding photographer",
    "photography studio",
    "photo studio near me",
    "photoshoot near me",
    "wedding photographer near me",
    "best photography studio",
    "premium photography services",

    // Shoot types
    "destination wedding photography",
    "outdoor photoshoot",
    "indoor photoshoot",
    "studio photoshoot",
    "pre wedding shoot ideas",
    "wedding shoot ideas",
    "creative photoshoot ideas",
    "cinematic pre wedding shoot",
    "romantic couple photoshoot",

    // Quality & value
    "high quality photography",
    "professional photoshoot services",
    "premium wedding photography",
    "luxury wedding photography",
    "budget wedding photographer",
    "custom photoshoot packages",
    "wedding photography packages",
    "event photography packages",

    // Media & delivery
    "wedding photo album",
    "cinematic wedding video",
    "wedding highlights video",
    "photo editing services",
    "professional photo retouching",
    "color grading photography",
    "digital photo album",
  ],

  authors: [{ name: "50mm Photography", url: "https://50mmphotography.in" }],
  creator: "50mm Photography",
  publisher: "50mm Photography",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/icon.jpeg",
    shortcut: "/icon.jpeg",
    apple: "/icon.jpeg",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://50mmphotography.in",
    siteName: "50mm Photography",
    title: "50mm Photography | Wedding, Pre-Wedding & Creative Shoots",
    description:
      "Premium photography studio for weddings, engagements, pre-weddings, birthdays, modeling portfolios and creative shoots. Capturing timeless moments with emotion and style.",
    images: [
      {
        url: "/Model shoot/image1.png", // 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "50mm Photography – Capturing Timeless Moments",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "50mm Photography | Wedding, Pre-Wedding & Creative Shoots",
    description:
      "Premium photography studio capturing weddings, pre-weddings, engagements, birthdays and creative portraits with emotion and elegance.",
    images: ["/images/og-image.jpg"],
  },

  alternates: {
    canonical: "https://50mmphotography.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
