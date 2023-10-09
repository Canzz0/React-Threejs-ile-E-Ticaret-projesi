import React from 'react';
import ReactDOM from 'react-dom';
import {useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import ChatWidget from '../../../components/chatwidget/chatwidget';
import axios from 'axios';

function HomeComponent() {
    const [user,setUser]= useState([]);
    const getuser = async () => {
        try {
            const token = sessionStorage.getItem('token'); // Token'i alın
            console.log(token)
          const response = await axios.get('http://localhost:5000/secure-token', {
            headers: {
                'Authorization': `${token}`
              }
          });
        setUser(response.data.user);
      
          console.log(response.data.user);
        } catch (error) {
          console.error(error);
        }
      };
    useEffect(() => {
        getuser();
    },[])
    return (
        <>
            <div className="welcome-page">
                <div className="corner"></div>
                <div className="corner"></div>
                <div className="corner"></div>
                <div className="corner"></div>
                <div className="welcome-content">
                    <p data-shadow="WELCOME"><span>H</span><span>O</span>Ş<span>G</span>E<span>L</span>D<span>İ</span>N<span>İ</span>Z<span></span></p>
                </div>
            </div>
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/shop" className="link">
                    <div className="container">
                        <div className="content">
                            <h1>Teknoloji</h1>
                            <br/>
                            <p>
                                En iyi cihazların bulunduğu ve özelleştirme yapabilmenizi sağlıyoruz.
                            </p>
                        </div>
                        <img src={require('./images/laptop.png')} className="image" alt="Laptop" />
                    </div>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/shop" className="link">
                    <div className="container">
                        <div className="content">
                            <h1>Giyim</h1>
                            <br/>
                            <p>
                                Sizin için en iyi ürünleri sizlerin de tasarlayabilmesini sağlıyoruz
                            </p>
                        </div>
                        <img src={require('./images/t-shirt.png')} className="image" alt="giyim" />                            </div>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/shop" className="link">
                    <div className="container ">
                        <div className="content">
                            <h1>Dekorasyon</h1>
                            <br />                                    <p>
                                  Eviniz için en iyi ürünler burada ayrıca isterseniz sizlerde tasarlayabilirsiniz.
                            </p>
                        </div>
                        <img src={require('./images/shoes.png')} className="image" alt="ayakkabı" />
                    </div>
                </Link>
                
        <ChatWidget />
        </>)
}
export default HomeComponent;