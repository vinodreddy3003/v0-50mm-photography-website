import { list } from "@vercel/blob"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "portfolio/" })

    const images = blobs
      .filter((blob) => {
        const ext = blob.pathname.split(".").pop()?.toLowerCase()
        return ["jpg", "jpeg", "png", "webp", "avif"].includes(ext || "")
      })
      .map((blob) => {
        const filename = blob.pathname.split("/").pop() || "untitled"
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, "")
        // Extract category from path like "portfolio/wedding/image.jpg"
        const parts = blob.pathname.split("/")
        const category = parts.length > 2 ? parts[1] : "other"

        return {
          src: blob.url,
          alt: nameWithoutExt.replace(/-/g, " "),
          title: nameWithoutExt.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
          category,
          uploadedAt: blob.uploadedAt,
        }
      })
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
