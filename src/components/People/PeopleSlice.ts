import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoadState, PersonType } from '../../types'
import { getAllPeople } from '../../api'

// Define a type for the slice state
interface PeopleState {
  loadState: LoadState,
  people: Array<PersonType>,
  nextPage: string | null,
}

// Define the initial state using that type
const initialState: PeopleState = {
  loadState: LoadState.INIT,
  people: [],
  nextPage: null,
}

export const fetchPeopleAsync = createAsyncThunk(
    'peopleState/getPeople',
    async (pageNum:string = '1') => {
      const response = await getAllPeople(pageNum);
      return response;
    }
  );

export const peopleSlice = createSlice({
  name: 'peopleState',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeopleAsync.pending, (state) => {
        state.loadState = LoadState.LOADING;
      })
      .addCase(fetchPeopleAsync.fulfilled, (state, action) => {
        state.loadState = LoadState.LOADED;
        state.people = [...state.people, ...action.payload.results];
        state.nextPage = action.payload.next ? new URL(action.payload.next).searchParams.get('page') : null
      })
      .addCase(fetchPeopleAsync.rejected, (state) => {
        state.loadState = LoadState.ERROR;
      });
  },
})

export default peopleSlice.reducer;