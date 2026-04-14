import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ListingSortKey = 'price' | 'name'
export type ListingSortDirection = 'asc' | 'desc'

export type ListingPreferencesState = {
  search: string
  sortKey: ListingSortKey
  sortDirection: ListingSortDirection
  pageSize: number
}

const initialState: ListingPreferencesState = {
  search: '',
  sortKey: 'price',
  sortDirection: 'asc',
  pageSize: 8,
}

const slice = createSlice({
  name: 'listingPreferences',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setSortKey(state, action: PayloadAction<ListingSortKey>) {
      state.sortKey = action.payload
    },
    setSortDirection(state, action: PayloadAction<ListingSortDirection>) {
      state.sortDirection = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
  },
})

export const listingPreferencesReducer = slice.reducer
export const listingPreferencesActions = slice.actions

