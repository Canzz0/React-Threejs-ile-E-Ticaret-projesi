import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { addCategory, removeCategory } from "../../../redux/features/category/category";

function AddCategoryComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();  //Navigate hooks kullanmak için
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    //GETİRME
    const getAll = async () => {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
    }
    ///Ürünlerimizi apı den Çekme işlemini yaptık 
    useEffect(() => {
        getAll();
        checkIsAdmin();
    }, []);


    const remove = async (_id) => {
        let confirm = window.confirm("Kategori silmek istiyor musunuz?")
        if (confirm) {
            let model = { id: _id };
            const action = await dispatch(removeCategory(model));
            if (removeCategory.fulfilled.match(action)) {
                // Ekleme işlemi başarılı olduğunda yapılacak işlemleri burada gerçekleştirin
                
            }
            window.location.reload()

        }
    }
    ///EKLEME
    const add = async (e) => {
        e.preventDefault();
        let formData = { name: name };
        const action = await dispatch(addCategory(formData));
        if (addCategory.fulfilled.match(action)) {
        }
        setName('');
        window.location.reload()
    }
    //Yetki Kontrolü
    const checkIsAdmin = () => {
        let admin = JSON.parse(sessionStorage.getItem("admin"));
        if (!admin) {  //Admin değeri false ise engelle
            alert("Bu Sayfaya Erişiminiz Bulunmamaktadır")
            navigate("/");
        }
    }

    return (

        <>
            <title>Kategoriler</title>
            <div className="p-5 mt-2">
                <div className="card">
                    <div className="card-header">
                        <h1>Kategori Listesi</h1>
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
                                        <th>Kategori Adı</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{category.name}</td>
                                            <td>
                                                <button onClick={() => remove(category._id)} className='btn btn-outline-danger btn-sm'>
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
                            <h5 className="modal-title" id="addModalLabel">Kategori Ekle</h5>
                            <button id="addModalCloseBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={add}>   {/* Burada da modal yani pop-up içinde ekleme işlemini yaptık form-group dosyalarımızı ekleyip değerlerimizi yerine yazdırıp ekleme işlemi */}
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Kategori Adı</label>
                                    <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" />
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

export default AddCategoryComponent;