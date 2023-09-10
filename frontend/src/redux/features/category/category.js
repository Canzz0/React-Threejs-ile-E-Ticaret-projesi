import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"
const initialState = {
    category: []
}
export const getCategory = createAsyncThunk('getCategory', async () => {  //çağırma metodu normal reduxtan farklı
    const { data } = await axios.get('http://localhost:5000/categories')    //Adres
    return data;
})
export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCategory.fulfilled, (state, action) => {  
            state.category=action.payload;
        });
    }
})


export default categorySlice.reducer;  //klasik default