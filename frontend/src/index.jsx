import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LayoutComponent from './components/layout';
import HomeComponent from './pages/home/home';
import ProductComponent from './pages/sellerpages/product/product';
import OrderComponent from './pages/customerpages/order';
import BasketComponent from './pages/customerpages/basket/basket';
import LoginComponent from './pages/login/login';
import RegisterComponent from './pages/register/register';
import ProductDetailComponent from './pages/customerpages/productdetail';
import ShopComponent from './pages/customerpages/basket/shop';
import AddCategoryComponent from './pages/adminpages/addcategorypage/addcategory';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';
import SellerHomeComponent from './pages/sellerpages/sellerhome/sellerhome';
import AdminChat from './pages/adminpages/adminchat/adminchat';


const token = sessionStorage.getItem('token');

console.log(token)

function AppComponent (){
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<LayoutComponent/>} >  //Burada navbar için aşağıdaki route elementlerini layout componentinde kullanılması için iç içe yazdık 
        <Route index element={<HomeComponent/>}></Route>
        <Route  path='products' element={<ProductComponent/>}></Route>
        <Route path='sellerhome' element={<SellerHomeComponent/>}></Route>
        <Route  path='home' element={<HomeComponent/>}></Route>
        <Route path='orders' element={<OrderComponent/>}></Route>
        <Route path='shop' element={<ShopComponent/>}></Route>
        <Route path='basket' element={<BasketComponent/>}></Route>
        <Route exact path="/products/:productId" element={<ProductDetailComponent/>} />
        <Route path='addcategory' element={<AddCategoryComponent/>}></Route>
        <Route  path='adminchat' element={<AdminChat/>}></Route>  
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
