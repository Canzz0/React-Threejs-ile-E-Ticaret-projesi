import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { Navigate } from "react-router-dom";
function ProductComponent() {
    const navigate = useNavigate();  //Navigate hooks kullanmak için
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [categoryName, setcategoryName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");

    //GETİRME
    const getAll = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    }
    ///Ürünlerimizi apı den Çekme işlemini yaptık 
    useEffect(() => {
        getAll();
        checkIsAdmin();
        

    }, []);

    useEffect(() => {
        document.title = 'Ürünler'; //İSMİ
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
    ///EKLEME
    const add = async (e) => {
        e.preventDefault();
        var Imginput = document.querySelector("input[type='file']");  //Resim seçmek için bu yolu kullandık
        const formData = new FormData();  //Burada da post işlemi için verileri forma yazdırıcız burda form oluşturuyoruz.
        formData.append("name", name); //Forma ekleme
        formData.append("categoryName", categoryName); //Forma ekleme
        formData.append("stock", stock); //Forma ekleme
        formData.append("price", price); //Forma ekleme
        formData.append("image", Imginput.files[0], Imginput.files[0].name); //Forma ekleme

        var response = await axios.post("http://localhost:5000/products/add", formData);
        alert(response.data.message);
        await getAll();
    }

    //Yetki Kontrolü
    const checkIsAdmin = () =>{   
        let user =JSON.parse(localStorage.getItem("user"));
        if (!user.isAdmin){  //Admin değeri false ise engelle
            alert("Bu Sayfaya Erişiminiz Bulunmamaktadır")
            navigate("/");
        }
    }

    return (

        <>
            <title>Product</title>
            <div className="container mt-2">
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
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img style={{ width: "250px" }} src={'http://localhost:5000/' + product.imageUrl} />
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.categoryName}</td>
                                            <td>{product.stock}</td>
                                            <td>{product.price}</td>
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
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Ürün Ekle</h5>
                            <button id="addModalCloseBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={add}>   {/* Burada da modal yani pop-up içinde ekleme işlemini yaptık form-group dosyalarımızı ekleyip değerlerimizi yerine yazdırıp ekleme işlemi */}
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Ürün Adı</label>
                                    <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="CategoryName">Kategori Adı</label>
                                    <select className='form-control'
                                        value={categoryName} onChange={(e) => setcategoryName(e.target.value)}>
                                        <option value="0">Seçim Yapınız...</option>
                                        <option>Sebze</option>
                                        <option>Meyve</option>
                                        <option>Teknoloji</option>
                                        <option>Diğer</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock"> Stok Adedi</label>
                                    <input className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} id="stock" name="stock" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Birim Fiyatı</label>
                                    <input className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} id="price" name="price" />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='image'>Resmi</label>
                                    <input type="file" className='form-control' value={image} onChange={(e) => setImage(e.target.value)} id="image" name="image" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Kapat</button>
                                <button type="submit" className="btn btn-primary">Kaydet</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;