import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { verifySession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const category = (formData.get("category") as string) || "other"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const blob = await put(`portfolio/${category}/${file.name}`, file, {
      access: "public",
    })

    return NextResponse.json({
      url: blob.url,
      filename: file.name,
      category,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
