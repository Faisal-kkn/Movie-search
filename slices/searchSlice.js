import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
    searchData: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        storeSearchValue: (state, action) => {
            state.value = action.payload
        },
        storeSearchData: (state, action) => {
            state.searchData = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { storeSearchValue, storeSearchData, incrementByAmount } = searchSlice.actions

export const selectValue = (state) => state.search.value
export const selectSearchData = (state) => state.search.searchData

export default searchSlice.reducer