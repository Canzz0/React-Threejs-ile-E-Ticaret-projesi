// userSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: []
};

// Asenkron işlemi gerçekleştiren eylem oluşturucu
export const getUser = createAsyncThunk('getUser', async (token) => {
    const response = await axios.get('http://localhost:5000/secure-token', {
        headers: {
            'Authorization': `${token}`
        }
    });
    return {
        data: response.data.user,
    };
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    }

})

export default userSlice.reducer;
