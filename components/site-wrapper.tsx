"use client"

import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { CustomCursor } from "@/components/custom-cursor"
import { SoundToggle } from "@/components/sound-toggle"
import { LoadingScreen } from "@/components/loading-screen"

interface SiteWrapperProps {
  children: ReactNode
  showLoading?: boolean
}

export function SiteWrapper({ children, showLoading = false }: SiteWrapperProps) {
  return (
    <>
      {showLoading && <LoadingScreen />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
      <SoundToggle />
    </>
  )
}
