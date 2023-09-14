import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"
const initialState = {
    category: []
}
export const getCategory = createAsyncThunk('getCategory', async () => {  //çağırma metodu normal reduxtan farklı
    const { data } = await axios.get('http://localhost:5000/categories')    //Adres
    return data;
})

//// EKLEME İŞLEMİ //// 
export const addCategory = createAsyncThunk('addCategory', async (formData) => {
    try {
        const { data } = await axios.post('http://localhost:5000/categories/add', formData);
        //MESAJI ALMA
        const successMessage = data.message;
        alert(successMessage);
        return successMessage;
    } catch (error) {
        console.error(error);
        throw error;
    }
})

//// SİLME İŞLEMİ ////
export const removeCategory = createAsyncThunk('removeCategory', async (model) => {
    try {
    const { deletedata } =await axios.post('http://localhost:5000/categories/remove', { _id: model.id });
    const successMessage = deletedata.message;
        alert(successMessage);
        return successMessage;
    }catch (error) {
        console.error(error);
        throw error;
    }

});

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.fulfilled, (state, action) => {
                state.category = action.payload;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.category.push(action.payload); // Yeni kategoriyi ekleyin
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                const removedCategoryId = action.payload;
                state.category = state.category.filter((category) => category._id !== removedCategoryId);
            })
    }

})


export default categorySlice.reducer;  //klasik default