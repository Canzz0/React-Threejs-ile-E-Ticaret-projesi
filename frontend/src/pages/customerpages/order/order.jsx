import { useEffect, useState } from "react";
import axios from "axios";
function OrderComponent() {
    const [orders, setOrders] = useState([]);  //Basket değerleri alma güncelleme için
    const token = sessionStorage.getItem('token');

    //GETİRME
    const getAll = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getorder", {
                headers: {
                    'Authorization': `Bearer ${token}` // Tokenı ekleyin
                }
            });
            setOrders(response.data);
        } catch (error) {
            // Hata durumlarını ele alın
            console.error('Hata:', error);
        }
    }
    ///Ürünlerimizi apı den Çekme işlemini yaptık 
    useEffect(() => {
        getAll();
    }, []);


    return (
        <>
            <title>Siparişlerim</title>
            <div className="container mt-2">
                <div className="card ">
                    <div className="card-header">
                        <h1>Siparişlerim</h1>
                    </div>
                    <div className="card-body ">
                        <div className="row ">
                            <div className="col-md-12">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Ürün Adı</th>
                                            <th>Kategori Adı</th>

                                            <th>Birim Fiyatı</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            order.productInfo.map((product) => {
                                                if ('"' + product.userId + '"' === sessionStorage.getItem('id')) {
                                                    return (
                                                        <tr key={product._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                            <td>{product.categoryName}</td>
                                                        </tr>
                                                    );
                                                } else {
                                                    return (
                                                        <tr>

                                                            <td colSpan="4">Bilgi Bulunamadı</td>
                                                        </tr>
                                                    );
                                                }
                                            })
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default OrderComponent;