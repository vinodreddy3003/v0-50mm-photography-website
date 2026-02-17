import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD_HASH =
  "$2a$10$CwTycUXWue0Thq9StjUM0u7tCjPUq3QGmC.cEGz5yGA4jb9MkeOYy" // "50mmadmin"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "50mm-photography-secret-key-2024"
)

export async function createSession(username: string, password: string) {
  const bcrypt = await import("bcryptjs")
  if (username !== ADMIN_USERNAME) {
    return null
  }
  const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  if (!isValid) {
    return null
  }

  const token = await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(JWT_SECRET)

  return token
}

export async function verifySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin-session")?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { username: string; role: string }
  } catch {
    return null
  }
}
