import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  axios from 'axios';

const url = 'https://randomuser.me/api/?results=5';
const initialState = {
    isLoading: true,
    users: [],
    error: null
};

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
    try {
        const response = await axios.get(url)
        return response.data.results;
        //console.log(response)
    }
    catch (err) {
        return err.message;
    }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => { state.isLoading = true })
    builder.addCase(fetchUser.fulfilled, (state, action) => { state.isLoading = false
    state.users = action.payload
    state.error = null})
    builder.addCase(fetchUser.rejected, (state, action) => { state.isLoading = false
    state.users = []
    state.error = action.error.message
    })
  },
});

export default usersSlice.reducer;