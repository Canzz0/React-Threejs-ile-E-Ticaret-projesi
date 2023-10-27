import axios from 'axios';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "../../../redux/features/tokenmatch/tokenmatch";

import LineChart from './charts/lineChart';
import PieChart from './charts/pieChart';
import './sellergraphic.css';

Chart.register(CategoryScale);

const ProductChartComponent = () => {
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
  const getAll = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getorder", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  }
  useEffect(() => {
    getAll();
  }, []);

  const groupAndSumProducts = (productInfo) => {
    const groupedProducts = {};
    productInfo.forEach((product) => {
      const { _id, name, sellerId } = product;
      if (product.sellerid  ===userData._id) {   //giriş yapan kullanıcıya ait bilgiler
        if (!groupedProducts[_id]) {   //Eğer buna ait id'li product değeri yoksa
          groupedProducts[_id] = {
            id: _id,
            name: name,
            sellerId: sellerId,
            total: 1,
          };

        } else {  //Eğer buna ait id'li product değeri varsa
          groupedProducts[_id].total += 1;  
        }
      }

    });

    return Object.values(groupedProducts); //Diziye dönüştürdük
  };

  const groupedProducts = groupAndSumProducts(   //Grupladık
    orders.flatMap((order) => order.productInfo)
  );

  const data = {
    labels: groupedProducts.map((product) => product.name),
    datasets: [
      {
        data: groupedProducts.map((product) => product.total),
        backgroundColor: ['#CAE7E8', '#A2D7DD', '#78CDD7'],
        hoverBackgroundColor: ['#6ed9ff', '#247a9d', '#1e2c37'],

      },
    ],
  };
  return (<>
    <h1 className='justify-content-center mt-2 text-center'>Satış Analizleri</h1>
    <div className='chart-place'>
      <PieChart data={data} />
      <LineChart data={data} />
    </div>
  </>

  );
};

export default ProductChartComponent;
