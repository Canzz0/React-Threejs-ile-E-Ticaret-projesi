import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

function HomeComponent() {
    useEffect(() => {
    })
    return (
        <>
            <div className="welcome-page">
                <div className="corner"></div>
                <div className="corner"></div>
                <div className="corner"></div>
                <div className="corner"></div>
                <div className="content">
                    <p data-shadow="WELCOME"><span>H</span><span>O</span>Ş<span>G</span>E<span>L</span>D<span>İ</span>N<span>İ</span>Z<span></span></p>
                </div>
            </div>
            <Parallax pages={3}>
                <div className=" w-100" >
                    
                    <ParallaxLayer offset={0} className='parallax ' style={{ height: '25%' }}>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/shop" className="parallax-link">
                            <div className="parallax-container">
                                <div className="parallax-content">
                                    <h1>Teknoloji</h1>
                                    <br />
                                    <p>
                                        En iyi cihazların bulunduğu ve özelleştirme yapabilmenizi sağlıyoruz.
                                    </p>
                                </div>
                                <img src={require('../images/laptop.png')} className="parallax-image" alt="Laptop" />
                            </div>
                        </Link>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1} className='parallax ' style={{ height: '25%' }}>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/shop" className="parallax-link">
                            <div className="parallax-container">
                                <div className="parallax-content">
                                    <h1>Giyim</h1>
                                    <br />
                                    <p>
                                        Sizin için en iyi ürünleri sizlerin de tasarlayabilmesini sağlıyoruz
                                    </p>
                                </div>
                                <img src={require('../images/t-shirt.png')} className="parallax-image" alt="giyim" />
                            </div>
                        </Link>
                    </ParallaxLayer>
                    <ParallaxLayer offset={2} className='parallax ' style={{ height: '25%' }}>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/shop" className="parallax-link">
                            <div className="parallax-container ">
                                <div className="parallax-content">
                                    <h1>Dekorasyon</h1>
                                    <br />
                                    <p>
                                        Eviniz için en iyi ürünler burada ayrıca isterseniz sizlerde tasarlayabilirsiniz.
                                    </p>
                                </div>
                                <img src={require('../images/shoes.png')} className="parallax-image" alt="ayakkabı" />
                            </div>
                        </Link>
                    </ParallaxLayer>
                </div>
            </Parallax>
        </>)
}
export default HomeComponent;