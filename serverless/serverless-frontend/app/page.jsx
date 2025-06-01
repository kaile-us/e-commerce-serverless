"use client"

import ProductGrid from "@/components/product-grid"
import SearchBar from "@/components/search-bar"
import { apiClient } from "@/lib/api-client"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function Home() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.products.getAll(query)
        console.log("Fetched products:", data)
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [query])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">E-commerce Store</h1>
        <SearchBar initialQuery={query} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">E-commerce Store</h1>
      <SearchBar initialQuery={query} />
      <ProductGrid products={products} />
    </div>
  )
}