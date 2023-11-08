import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryComponent from '../../../components/category/category';
function ShopComponent() {
    const [products, setProducts] = useState([]);
    const [isVisible, setIsVisible] = useState(false); //Sayfanın animasyonu için ben yavaş yüklenme animasyonu kullandım
    useEffect(() => {
        setIsVisible(true);
        getAll();
    })
    //GETİRME
    const getAll = async () => {
        const response = await axios.get("http://localhost:5000/getproduct");

        setProducts(response.data);
    }
    
    console.log(products)

    return (
        <>

            <div className=" w-100 row mt-5 ">
                 <div className="col-3">
                    <CategoryComponent />
                </div> 
                <div className="col-9">
                <h1 className=''><strong>Alışveriş</strong></h1><hr/>
                    <div className={`custom-cards ${isVisible ? 'active' : ''}`}>
                        {products.map((product, index) => (
                            <div className="custom-card ">
                                <Link to={`/products/${product._id}`}>
                                    <img src={'http://localhost:5000/' + product.imageUrl} class="character" />
                                    <div className="custom-card-image">
                                        <img width={150} src={'http://localhost:5000/' + product.imageUrl}/>
                                    </div>
                                    <div className="custom-card-title">
                                        {product.name}
                                    </div>
                                    <div className="custom-card-content">
                                        {product.description}
                                    </div>
                                    <div className="custom-card-price">
                                        Fiyat:<strong>{product.price}</strong>
                                    </div>
                                   
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>)
}
export default ShopComponent;