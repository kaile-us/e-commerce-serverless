"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "react-oidc-context"

export default function CheckoutLayout({ children }) {
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    // Check auth on client side
    if (!auth.isAuthenticated) {
      router.push("/login?redirectTo=/checkout")
    }
  }, [auth.isAuthenticated, router])

  // Show loading or children based on auth state
  if (!auth.isAuthenticated) {
    return null // Or a loading spinner
  }

  return <>{children}</>
}