import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout/layout';
import './index.css';
import AddCategoryComponent from './pages/adminpages/addcategorypage/addcategory';
import AdminChat from './pages/adminpages/adminchat/adminchat';
import BasketComponent from './pages/customerpages/basket/basket';
import HomeComponent from './pages/customerpages/home/home';
import OrderComponent from './pages/customerpages/order/order';
import ProductDetailComponent from './pages/customerpages/productdetail/productdetail';
import ShopComponent from './pages/customerpages/shop/shop';
import LoginComponent from './pages/login/login';
import RegisterComponent from './pages/register/register';
import ProductComponent from './pages/sellerpages/product/product';
import SellerGraphicComponent from './pages/sellerpages/sellergraphic/sellergraphic';
import UpdateUser from './pages/updateuser/updateuser';
import { store } from './redux/app/store';
import reportWebVitals from './reportWebVitals';




function AppComponent (){
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<LayoutComponent/>} >  //Burada navbar için aşağıdaki route elementlerini layout componentinde kullanılması için iç içe yazdık 
        <Route index element={<HomeComponent/>}></Route>
        <Route  path='products' element={<ProductComponent/>}></Route>
        <Route path='sellergraphic' element={<SellerGraphicComponent/>}></Route>
        <Route  path='home' element={<HomeComponent/>}></Route>
        <Route path='orders' element={<OrderComponent/>}></Route>
        <Route path='shop' element={<ShopComponent/>}></Route>
        <Route path='basket' element={<BasketComponent/>}></Route>
        <Route exact path="products/:productId" element={<ProductDetailComponent/>} />
        <Route path='addcategory' element={<AddCategoryComponent/>}></Route>
        <Route  path='adminchat' element={<AdminChat/>}></Route>
        <Route path='updatepages' element={<UpdateUser/>}></Route>       //LOGİN VEAYA REGİSTER sayfalarında navbar olmayacağı için içine yazmadık

      </Route>

      <Route path='login' element={<LoginComponent/>}></Route>       //LOGİN VEAYA REGİSTER sayfalarında navbar olmayacağı için içine yazmadık
      <Route path='register' element={<RegisterComponent/>}></Route>
      
    </Routes>

    </BrowserRouter>
    </Provider>
    </>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppComponent />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
