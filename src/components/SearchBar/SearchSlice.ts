import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoadState, PersonType } from '../../types'
import { getNextSearchPage, searchPeople } from '../../api'

interface SearchState {
    loadState: LoadState,
    searchResults: Array<PersonType>,
    nextPage: string | null,
    searchTerm: string | null,
}

const initialState: SearchState = {
    loadState: LoadState.INIT,
    searchResults: [],
    nextPage: null,
    searchTerm: null,
}

export const searchPeopleAsync = createAsyncThunk(
    'searchState/searchPeople',
    async (searchTerm: string) => {
        const response = await searchPeople(searchTerm);
        return response;
    }
)

export const loadNextSearchPageAsync = createAsyncThunk(
    'searchState/loadNextSearchPage',
    async (searchTerm: string) => {
        const response = await getNextSearchPage(searchTerm);
        return response;
    }
)

export const searchSlice = createSlice({
    name: 'searchState',
    initialState,
    reducers: {
        clearSearchResults: (state) => {
            state.loadState = LoadState.INIT;
            state.searchResults = [];
            state.nextPage = null;
            state.searchTerm = null;
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchPeopleAsync.pending, (state) => {
          state.loadState = LoadState.LOADING;
        })
        .addCase(searchPeopleAsync.fulfilled, (state, action) => {
          state.loadState = LoadState.LOADED;
          state.searchResults = [...action.payload.results];
          state.nextPage = action.payload.next;
        })
        .addCase(searchPeopleAsync.rejected, (state) => {
          state.loadState = LoadState.ERROR;
        })
        .addCase(loadNextSearchPageAsync.pending, (state) => {
          state.loadState = LoadState.LOADING;
        })
        .addCase(loadNextSearchPageAsync.fulfilled, (state, action) => {
          state.loadState = LoadState.LOADED;
          state.searchResults = [...state.searchResults, ...action.payload.results];
          state.nextPage = action.payload.next;
        })
        .addCase(loadNextSearchPageAsync.rejected, (state) => {
          state.loadState = LoadState.ERROR;
        });
    },
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;