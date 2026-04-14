import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import debounce from 'lodash.debounce'
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  listingPreferencesActions,
} from '../../../features/listingPreferences/listingPreferencesSlice'
import type {
  ListingSortDirection,
  ListingSortKey,
} from '../../../features/listingPreferences/listingPreferencesSlice'

export function ListingToolbar({
  totalCount,
  pageSize,
  onPageSizeChange,
}: {
  totalCount: number
  pageSize: number
  onPageSizeChange: (next: number) => void
}) {
  const dispatch = useAppDispatch()
  const { search, sortKey, sortDirection } = useAppSelector(
    (s) => s.listingPreferences,
  )

  const [searchDraft, setSearchDraft] = useState(search)

  useEffect(() => {
    setSearchDraft(search)
  }, [search])

  const commitSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(listingPreferencesActions.setSearch(value))
      }, 250),
    [dispatch],
  )

  useEffect(() => {
    return () => commitSearch.cancel()
  }, [commitSearch])

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value
    setSearchDraft(next)
    commitSearch(next)
  }

  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 750 }}>
          Registered Vehicles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {totalCount.toLocaleString()} records
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <TextField
          value={searchDraft}
          onChange={onSearchChange}
          size="small"
          placeholder="Search by vehicle name..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="sort-key">Sort by</InputLabel>
          <Select
            labelId="sort-key"
            value={sortKey}
            label="Sort by"
            onChange={(e) =>
              dispatch(
                listingPreferencesActions.setSortKey(e.target.value as ListingSortKey),
              )
            }
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="sort-dir">Direction</InputLabel>
          <Select
            labelId="sort-dir"
            value={sortDirection}
            label="Direction"
            onChange={(e) =>
              dispatch(
                listingPreferencesActions.setSortDirection(
                  e.target.value as ListingSortDirection,
                ),
              )
            }
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="page-size">Page size</InputLabel>
          <Select
            labelId="page-size"
            value={String(pageSize)}
            label="Page size"
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="12">12</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

