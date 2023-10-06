import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link, useNavigate } from 'react-router-dom';
import AddProduct from "./addproduct";
import RemoveProduct from "./removeproduct";
import './product.css'
function ProductComponent() {
    const navigate = useNavigate();  //Navigate hooks kullanmak için
    const [products, setProducts] = useState([]);

    const token = sessionStorage.getItem('token');
    //GETİRME
    const getAll = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getproduct", {
                
            });
            setProducts(response.data);
        } catch (error) {
            // Hata durumlarını ele alın
            console.error('Hata:', error);
        }
    }
    ///Ürünlerimizi apı den Çekme işlemini yaptık 
    useEffect(() => {
        getAll();

        document.title = 'Ürünler';
    }, []);

    return (

        <>
            <div className="p-5 mt-2">
                <div className="card">
                    <div className="card-header">
                        <h1>Ürün Listesi</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <button className="btn btn-outline-primary" data-bs-toggle="modal"
                                data-bs-target="#addModal">
                                Ekle
                            </button>
                            <table className=" mt-2 table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Resim</th>
                                        <th>Ürün Adı</th>
                                        <th>Kategori Adı</th>
                                        <th>Adet</th>
                                        <th>Fiyatı</th>
                                        <th>Detay Sayfası</th>
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => {
                                        return (<tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img style={{ width: "75px" }} src={'http://localhost:5000/' + product.imageUrl} />
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.categoryName}</td>
                                            <td>{product.stock}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                {/* Ürün detay sayfası linki */}
                                                <Link to={`/products/${product._id}`}>Detay</Link>
                                            </td>
                                            <td>
                                                <RemoveProduct _id={product._id} />
                                            </td>
                                        </tr>)
                                    })}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

            </div>



            <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
                <AddProduct />
            </div>
        </>
    )
}

export default ProductComponent;