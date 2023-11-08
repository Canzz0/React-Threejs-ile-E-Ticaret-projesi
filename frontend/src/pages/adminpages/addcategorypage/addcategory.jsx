import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addCategory, removeCategory } from "../../../redux/features/category/category";
import { getUser } from "../../../redux/features/tokenmatch/tokenmatch";

function AddCategoryComponent() {
    const [userData, setUserData] = useState([]);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);


    //Kullanıcı bilgilerini getirmek ve redux'ta saklamak için
    useEffect(() => {
        dispatch(getUser(token));
    }, [dispatch, token]);
    console.log(user.data.isAdmin)

    //Bilgileri kayıt etmek için kullanılır
    useEffect(() => {
        if (user.data) {
            setUserData(user.data);
            checkIsAdmin(user.data.isAdmin);
        }
    }, [user]);

    const checkIsAdmin = (isAdmin) => {
        if (!isAdmin) {
            Swal.fire({
                icon: 'error',
                title: 'Hata!',
                text: 'Bu Sayfaya Erişiminiz Bulunmamakta!!',
            });
            navigate("/");
        }
    }

    const getAll = async () => {
        const response = await axios.get("http://localhost:5000/getCategory");
        setCategories(response.data);
    }

    useEffect(() => {
        getAll();
    }, []);

    const remove = async (_id) => {
        let confirm = window.confirm("Kategori silmek istiyor musunuz?")
        if (confirm) {
            let model = { id: _id };
            const action = await dispatch(removeCategory(model));
            if (removeCategory.fulfilled.match(action)) {
                window.location.reload()
            }
        }
    }
    //EKleme
     const add = async (e) => {
        e.preventDefault();
        let formData = { name: name };
        const action = await dispatch(addCategory(formData));
        if (addCategory.fulfilled.match(action)) {
        }
        setName('');
        window.location.reload('/')
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
                            <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                                Ekle
                            </button>
                            <table className="mt-2 table table-bordered table-hover">
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
                        <form onSubmit={add}>
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
