import { useSelector, useDispatch } from 'react-redux';
import { getCategory } from "../../../redux/features/category/category";
import { useEffect, useState } from "react";
import axios from "axios";
function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryName, setcategoryName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");
    const [figur, setFigur] = useState("");

    //CATEGORY GETİRME (REDUX İLE)
    const dispatch = useDispatch();
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
        formData.append("name", name);
        formData.append("description", description);
        formData.append("categoryName", categoryName);
        formData.append("stock", stock);
        formData.append("price", price);
        formData.append("sellerid", sessionStorage.getItem('id'));
        formData.append("image", imageInput.files[0], imageInput.files[0].name);
        formData.append("figur", figurInput.files[0], figurInput.files[0].name);
        var response = await axios.post("http://localhost:5000/products/add", formData);
        alert(response.data.message);
        window.location.reload('/')
    }
    const message = useSelector((state) => state.category.message); // Redux store'dan mesajı alın

    console.log(message)
    return (
        <>
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