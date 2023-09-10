import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LayoutComponent from './pages/layout';
import HomeComponent from './pages/home/home';
import ProductComponent from './pages/product/product';
import OrderComponent from './pages/order';
import BasketComponent from './pages/basket/basket';
import LoginComponent from './pages/login/login';
import RegisterComponent from './pages/register/register';
import ProductDetailComponent from './pages/productdetail';
import ShopComponent from './pages/shop';
import AddCategoryComponent from './pages/category/addcategorypage/addcategory';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';



function AppComponent (){
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<LayoutComponent/>} >  //Burada navbar için aşağıdaki route elementlerini layout componentinde kullanılması için iç içe yazdık 
        <Route index element={<HomeComponent/>}></Route>
        <Route  path='products' element={<ProductComponent/>}></Route>
        <Route  path='home' element={<HomeComponent/>}></Route>
        <Route path='orders' element={<OrderComponent/>}></Route>
        <Route path='shop' element={<ShopComponent/>}></Route>
        <Route path='basket' element={<BasketComponent/>}></Route>
        <Route exact path="/products/:productId" element={<ProductDetailComponent/>} />
        <Route path='addcategory' element={<AddCategoryComponent/>}></Route>  
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
