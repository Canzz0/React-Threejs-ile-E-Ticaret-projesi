import { useEffect, useState } from "react";
import axios from "axios";
import {Navigate,Link,useNavigate} from 'react-router-dom';
import AddProduct from "./addproduct";
import './product.css'
function ProductComponent() {
    const navigate = useNavigate();  //Navigate hooks kullanmak için
    const [products, setProducts] = useState([]);
    //GETİRME
    const getAll = async () => {
        const response = await axios.get("http://localhost:5000/products");
        
        setProducts(response.data);
    }
    ///Ürünlerimizi apı den Çekme işlemini yaptık 
    useEffect(() => {
        getAll();
        checkIsAdmin();
        document.title = 'Ürünler';
    }, []);

    const remove = async (_id) => {
        let confirm = window.confirm("Ürünü silmek istiyor musunuz?")
        if (confirm) {
            let model = { _id: _id };
            let response = await axios.post("http://localhost:5000/products/remove", model);
            alert(response.data.message);
            getAll();
        }
    }
   

    //Yetki Kontrolü
    const checkIsAdmin = () =>{   
        let admin =JSON.parse(sessionStorage.getItem("admin"));
        if (!admin){  //Admin değeri false ise engelle
            alert("Bu Sayfaya Erişiminiz Bulunmamaktadır")
            navigate("/");
        }
    }

    return (

        <>
            <title>Product</title>
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
                                    {products.map((product, index) => (
                                        <tr key={index}>
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
                                                <button onClick={() => remove(product._id)} className='btn btn-outline-danger btn-sm'>
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
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