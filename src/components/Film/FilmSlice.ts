import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoadState, FilmType } from '../../types'
import { getFilm } from '../../api'

interface FilmState {
    loadState: LoadState,
    films: Array<FilmType>,
}

const initialState: FilmState = {
    loadState: LoadState.INIT,
    films: [],
}

export const fetchFilmAsync = createAsyncThunk(
    'filmState/getFilm',
    async (url: string) => {
        const response = await getFilm(url);
        return response;
    }
)

export const speciesSlice = createSlice({
    name: 'filmState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchFilmAsync.pending, (state) => {
          state.loadState = LoadState.LOADING;
        })
        .addCase(fetchFilmAsync.fulfilled, (state, action) => {
          state.loadState = LoadState.LOADED;
          state.films = [...state.films, action.payload]
        })
        .addCase(fetchFilmAsync.rejected, (state) => {
          state.loadState = LoadState.ERROR;
        });
    },
});

export default speciesSlice.reducer;