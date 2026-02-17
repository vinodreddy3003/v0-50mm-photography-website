import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "50mm Photography Admin Panel - Manage your portfolio images.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
