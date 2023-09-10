import { configureStore } from "@reduxjs/toolkit";
import  categorySlice  from "./../features/category/category";

 //Burası bir nevi paylaşım noktası mesela sayi ile ilgilileri yazdık ülkeler ile ilgili yapmak istersek de aynı şekilde yazıcaz
 
export const store= configureStore({
    reducer:{
        category:categorySlice,
    }
})