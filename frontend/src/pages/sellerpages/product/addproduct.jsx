import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'; // react-toastify'yi içe aktarın
import { getCategory } from "../../../redux/features/category/category";
import { getUser } from "../../../redux/features/tokenmatch/tokenmatch";

function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryName, setcategoryName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");
    const [figur, setFigur] = useState("");
    const [userData, setUserData] = useState([]);
    const token = sessionStorage.getItem('token');
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
    //CATEGORY GETİRME (REDUX İLE)
    const { category } = useSelector(state => state.category)
    useEffect(() => {
        dispatch(getCategory())
    }, []);

    ///EKLEME
    const add = async (e) => {
        e.preventDefault();
        const imageInput = document.querySelector("input[name='image']");
        const figurInput = document.querySelector("input[name='figur']");
        const formData = new FormData();

        try {
            formData.append("name", name);
            formData.append("description", description);
            formData.append("categoryName", categoryName);
            formData.append("stock", stock);
            formData.append("price", price);
            formData.append("sellerid", userData._id);
            formData.append("image", imageInput.files[0], imageInput.files[0].name);
            formData.append("figur", figurInput.files[0], figurInput.files[0].name);
            var response = await axios.post("http://localhost:5000/addproduct", formData);
            toast.success(response.data.message, {
                autoClose: 1300,
            });
            window.location.reload('/')
        } catch (error) {
            toast.error('Bir hata oluştu.', {
                autoClose: 1300,
            });
            window.location.reload('/')
        }
    }
    return (
        <>
            <ToastContainer position="top-right" hideProgressBar />

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
                                <label htmlFor="description">Ürün Açıklaması</label>
                                <input className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} id="description" name="description" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="CategoryName">Kategori Adı</label>
                                <select className='form-control'
                                    value={categoryName} onChange={(e) => setcategoryName(e.target.value)}>
                                    {category.map((categor, index) => (
                                        <option key={index + 1}>{categor.name}</option>
                                    ))}
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
                            <div className='form-group'>
                                <label htmlFor='figur'>3B Figur</label>
                                <input type="file" className='form-control' value={figur} onChange={(e) => setFigur(e.target.value)} id="figur" name="figur" />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Kapat</button>
                            <button type="submit" className="btn btn-primary">Kaydet</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default AddProduct;