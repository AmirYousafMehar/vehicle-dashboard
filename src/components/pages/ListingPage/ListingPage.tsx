import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Pagination,
  Typography,
} from '@mui/material'
import { fetchProducts, PRODUCTS_FETCH_DELAY_MS } from '../../../services/products'
import { ProductCard } from '../../organisms/ProductCard/ProductCard'
import { ListingToolbar } from '../../molecules/ListingToolbar/ListingToolbar'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { listingPreferencesActions } from '../../../features/listingPreferences/listingPreferencesSlice'

export function ListingPage() {
  const dispatch = useAppDispatch()
  const { search, sortKey, sortDirection, pageSize } = useAppSelector(
    (s) => s.listingPreferences,
  )

  const [page, setPage] = useState(1)

  const query = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const [loadingMsLeft, setLoadingMsLeft] = useState<number>(PRODUCTS_FETCH_DELAY_MS)

  useEffect(() => {
    if (!query.isLoading) return

    const startedAt = Date.now()
    setLoadingMsLeft(PRODUCTS_FETCH_DELAY_MS)

    const id = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const left = Math.max(0, PRODUCTS_FETCH_DELAY_MS - elapsed)
      setLoadingMsLeft(left)
    }, 50)

    return () => window.clearInterval(id)
  }, [query.isLoading])

  const filteredSorted = useMemo(() => {
    const items = query.data ?? []
    const normalizedSearch = search.trim().toLowerCase()

    const filtered = normalizedSearch.length
      ? items.filter((p) => p.name.toLowerCase().includes(normalizedSearch))
      : items

    const sorted = [...filtered].sort((a, b) => {
      const dir = sortDirection === 'asc' ? 1 : -1
      if (sortKey === 'price') return dir * (a.price - b.price)
      return dir * a.name.localeCompare(b.name)
    })

    return sorted
  }, [query.data, search, sortKey, sortDirection])

  const pageCount = Math.max(1, Math.ceil(filteredSorted.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const start = (safePage - 1) * pageSize
  const pageItems = filteredSorted.slice(start, start + pageSize)

  function onChangePageSize(next: number) {
    dispatch(listingPreferencesActions.setPageSize(next))
    setPage(1)
  }

  return (
    <Box>
      <ListingToolbar
        totalCount={filteredSorted.length}
        pageSize={pageSize}
        onPageSizeChange={onChangePageSize}
      />

      {query.isError ? (
        <Alert severity="error">
          {query.error instanceof Error ? query.error.message : 'Failed to load products'}
        </Alert>
      ) : null}

      {query.isLoading ? (
        <Box>
          <Box
            sx={{
              py: { xs: 6, sm: 9 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
            }}
          >
            <CircularProgress size={44} thickness={4.5} />
            <Typography variant="body2" color="text.secondary">
              Loading products… {Math.ceil(loadingMsLeft / 100) / 10}s
            </Typography>
          </Box>
        </Box>
      ) : filteredSorted.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            py: 6,
            px: 3,
            mt: 1,
            textAlign: 'center',
            borderStyle: 'dashed',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No match for your current search/filter. Try a different keyword.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => dispatch(listingPreferencesActions.setSearch(''))}
          >
            Clear search
          </Button>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }}
        >
          {pageItems.map((p) => (
            <Box key={p.id}>
              <ProductCard product={p} />
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={pageCount}
          page={safePage}
          onChange={(_, next) => setPage(next)}
          color="primary"
        />
      </Box>
    </Box>
  )
}

