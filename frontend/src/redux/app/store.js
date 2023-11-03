import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./../features/category/category";
import userSlice from './../features/tokenmatch/tokenmatch';

//PAYLAŞIM NOKTASI
 
export const store= configureStore({
    reducer:{
        category:categorySlice,
        user: userSlice,
    }
})
