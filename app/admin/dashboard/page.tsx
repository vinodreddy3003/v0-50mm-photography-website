"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import useSWR, { mutate } from "swr"
import portfolioData from "@/data/portfolio.json"
import {
  Upload,
  Trash2,
  LogOut,
  ImageIcon,
  FolderOpen,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface BlobImage {
  src: string
  alt: string
  title: string
  category: string
  uploadedAt?: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("wedding")
  const [deleting, setDeleting] = useState<string | null>(null)

  const { data, isLoading } = useSWR<{ images: BlobImage[] }>(
    isAuthenticated ? "/api/images" : null,
    fetcher,
    { refreshInterval: 10000 }
  )

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session")
      const session = await res.json()
      if (session.authenticated) {
        setIsAuthenticated(true)
      } else {
        router.push("/admin")
      }
    } catch {
      router.push("/admin")
    }
  }, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin")
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    setUploadMessage(null)

    let successCount = 0
    let failCount = 0

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", selectedCategory)

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        if (res.ok) {
          successCount++
        } else {
          failCount++
        }
      } catch {
        failCount++
      }
    }

    setUploading(false)
    mutate("/api/images")

    if (failCount === 0) {
      setUploadMessage({ type: "success", text: `${successCount} image(s) uploaded successfully!` })
    } else {
      setUploadMessage({
        type: "error",
        text: `${successCount} uploaded, ${failCount} failed.`,
      })
    }
    setTimeout(() => setUploadMessage(null), 4000)

    // Reset input
    e.target.value = ""
  }

  const handleDelete = async (url: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    setDeleting(url)
    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      if (res.ok) {
        mutate("/api/images")
      }
    } catch {
      // silent fail
    }
    setDeleting(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }

  const categories = portfolioData.categories

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 md:px-12 py-4 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-serif tracking-wider text-foreground">50mm Admin</h1>
              <p className="text-xs text-muted-foreground">Image Management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
        {/* Upload section */}
        <div className="border border-border/50 bg-card/30 p-8 mb-8">
          <h2 className="font-serif text-xl text-foreground mb-6 flex items-center gap-3">
            <Upload className="w-5 h-5 text-primary" />
            Upload Images
          </h2>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Category select */}
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <label className="text-xs tracking-widest uppercase text-muted-foreground">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-card border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors min-w-[200px]"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload input */}
            <div className="flex-1 w-full">
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">
                Select Images
              </label>
              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border hover:border-primary transition-colors py-8 px-6 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
                {uploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                )}
                <p className="text-sm text-muted-foreground text-center">
                  {uploading
                    ? "Uploading..."
                    : "Click or drag images here to upload"}
                </p>
                <p className="text-xs text-muted-foreground/60">
                  JPG, PNG, WebP - Multiple files supported
                </p>
              </label>
            </div>
          </div>

          {/* Upload message */}
          <AnimatePresence>
            {uploadMessage && (
              <motion.div
                className={`mt-4 flex items-center gap-2 text-sm ${
                  uploadMessage.type === "success" ? "text-green-400" : "text-destructive"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {uploadMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {uploadMessage.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Current images */}
        <div className="border border-border/50 bg-card/30 p-8">
          <h2 className="font-serif text-xl text-foreground mb-6 flex items-center gap-3">
            <FolderOpen className="w-5 h-5 text-primary" />
            Uploaded Images
            {data?.images && (
              <span className="text-sm text-muted-foreground font-sans">
                ({data.images.length} images)
              </span>
            )}
          </h2>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}

          {data?.images && data.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.images.map((img) => (
                <motion.div
                  key={img.src}
                  className="relative group aspect-square overflow-hidden bg-muted border border-border/50"
                  layout
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <p className="text-xs text-foreground font-medium px-2 text-center truncate max-w-full">
                      {img.title}
                    </p>
                    <p className="text-[10px] tracking-widest uppercase text-primary">
                      {img.category}
                    </p>
                    <button
                      onClick={() => handleDelete(img.src)}
                      disabled={deleting === img.src}
                      className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-destructive/20 text-destructive-foreground hover:bg-destructive/40 transition-colors text-xs"
                    >
                      {deleting === img.src ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="text-center py-12">
                <ImageIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No uploaded images yet.</p>
                <p className="text-sm text-muted-foreground/60 mt-1">
                  Upload images above to populate the portfolio.
                </p>
              </div>
            )
          )}
        </div>

        {/* Info note */}
        <div className="mt-6 p-4 border border-border/30 bg-card/20">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">How it works:</strong> Images uploaded here are stored via
            Vercel Blob and automatically appear on the public portfolio page. Changes are reflected in
            real-time for all visitors. Default placeholder images are shown when no uploaded images exist.
          </p>
        </div>
      </div>
    </div>
  )
}
