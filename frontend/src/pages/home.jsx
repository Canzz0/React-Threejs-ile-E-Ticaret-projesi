
import { useEffect, useState } from "react";
import axios from "axios";
function HomeComponent() {
    const [products, setProducts] = useState([]);
    const getAll = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    }
    ///Ürünlerimizi apı den Çekme işlemini yaptık 
    useEffect(() => {
        getAll();


    }, []);

    const addBasket = async (productId) => {   //Biz burada oluşturduğumuz sepete ekle butonuna basıldığında hangi ürünün altındaysa o ürünü sepete eklemesini sağladık
        let user = JSON.parse(localStorage.getItem("user"))
        let model = {
            productId: productId,  // ürünün Id'sini aldık
            userId: user._id //Kullanıcının Id'sini aldık
        }
        var response = await axios.post("http://localhost:5000/baskets/add", model);
        alert(response.data.message);
        getAll()

    }
    return (
        <>
            <div className="Container"><div className="row mt-5">
                {products.map((product, index) => (
                    <div key={index} className="col-md-3">
                        <div className="card m-2">
                            <div className="card-header">
                                <h4>{product.name}</h4>
                            </div>
                            <img style={{ width: "150px" }} src={"http://localhost:5000/" + product.imageUrl} />
                            <div className="card-body mt-2 ">
                                <h5 className="card-title">Adet:{product.stock}</h5>
                                <h5 className="card-title">{product.price} TL</h5>
                                {product.stock>0 ? 
                                <button className="btn btn-success mt-2" onClick={() => addBasket(product._id)}>Sepete Ekle</button> :
                                <button className="btn btn-danger mt-2">Stok da Yok</button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            </div>

        </>
    )
}

export default HomeComponent;