import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./../features/category/category";
import userSlice from './../features/tokenmatch/tokenmatch';

 //Burası bir nevi paylaşım noktası mesela sayi ile ilgilileri yazdık ülkeler ile ilgili yapmak istersek de aynı şekilde yazıcaz
 
export const store= configureStore({
    reducer:{
        category:categorySlice,
        user: userSlice,
    }
})