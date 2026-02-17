import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about 50mm Photography - a premium photography brand specializing in wedding, engagement, pre-wedding, birthday, modeling and creative shoots. Meet the team behind the lens.",
  openGraph: {
    title: "About 50mm Photography",
    description:
      "A premium photography brand capturing real moments with emotion, simplicity, and soul.",
    images: [{ url: "/images/portfolio-team.png", width: 1200, height: 630, alt: "50mm Photography Team" }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
