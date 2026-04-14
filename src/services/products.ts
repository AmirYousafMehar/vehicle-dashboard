export type Product = {
  id: string
  name: string
  price: number
  imageUrl: string
}

export const PRODUCTS_FETCH_DELAY_MS = 1200

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export async function fetchProducts(): Promise<Product[]> {
  await sleep(PRODUCTS_FETCH_DELAY_MS)

  const res = await fetch('/mock/products.json')
  if (!res.ok) {
    throw new Error(`Failed to load products (${res.status})`)
  }

  const data = (await res.json()) as unknown
  if (!Array.isArray(data)) {
    throw new Error('Invalid products payload')
  }

  return data as Product[]
}

