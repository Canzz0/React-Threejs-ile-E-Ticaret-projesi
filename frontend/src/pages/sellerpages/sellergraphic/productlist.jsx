import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "../../../redux/features/tokenmatch/tokenmatch";
const ProductListComponent = () => {
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem('token');
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);


  //Kullanıcı bilgilerini getirmek ve redux'ta saklamak için
  useEffect(() => {
      dispatch(getUser(token));
  }, [dispatch, token]);


  //Bilgileri kayıt etmek için kullanılır
  useEffect(() => {
      if (user.data) {
          setUserData(user.data);
        
      }
  }, [user]);
  //GETİRME
  const getAll = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getorder", {
        headers: {
          'Authorization': `Bearer ${token}` // Tokenı ekleyin
        }
      });
      setOrders(response.data);
    } catch (error) {
      // Hata durumlarını ele alın
      console.error('Hata:', error);
    }
  }
  ///Ürünlerimizi apı den Çekme işlemini yaptık 
  useEffect(() => {
    getAll();
  }, []);


  return (<>
    <div className="title  mt-2 p-2 text-center justify-content-center ">
      <h1 className=''>Satılan Ürünler</h1>
    </div>
    <table className="table mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Adı</th>
          <th scope="col">Fiyat</th>
          <th scope="col">Kategori</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          order.productInfo.map((product) => {
            if (product.sellerid  ===userData._id) {
              return (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.categoryName}</td>
                </tr>
              );
            } else {
              return (
                <tr>

                  <td colSpan="4">Bilgi Bulunamadı</td>
                </tr>
              );
            }
          })
        ))}
      </tbody>
    </table>

  </>

  )
}

export default ProductListComponent