import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoadState, SpeciesType } from '../../types'
import { getSpecies } from '../../api'

interface SpeciesState {
    loadState: LoadState,
    species: Array<SpeciesType>,
}

const initialState: SpeciesState = {
    loadState: LoadState.INIT,
    species: [],
}

export const fetchSpeciesAsync = createAsyncThunk(
    'speciesState/getSpecies',
    async (url: string) => {
        const response = await getSpecies(url);
        return response;
    }
)

export const speciesSlice = createSlice({
    name: 'speciesState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSpeciesAsync.pending, (state) => {
          state.loadState = LoadState.LOADING;
        })
        .addCase(fetchSpeciesAsync.fulfilled, (state, action) => {
          state.loadState = LoadState.LOADED;
          state.species = [...state.species, action.payload]
        })
        .addCase(fetchSpeciesAsync.rejected, (state) => {
          state.loadState = LoadState.ERROR;
        });
    },
});

export default speciesSlice.reducer;