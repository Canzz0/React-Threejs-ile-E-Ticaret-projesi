import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

const ProductListComponent = () => {
  const [orders, setOrders] = useState([]);
  const sellerid= sessionStorage.getItem('id')
  const token = sessionStorage.getItem('token');
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
            if ('"'+product.sellerid+'"' === sessionStorage.getItem('id')) {
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