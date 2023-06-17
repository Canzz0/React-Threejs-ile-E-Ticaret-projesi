import { useEffect, useState } from "react";
import axios from "axios";
function OrderComponent(){
    const [orders, setOrders] = useState([]);  //Basket değerleri alma güncelleme için
  
    const getAll = async () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let model = { userId: user._id };//bunu backend'e göndermek için yaptık
        let response = await axios.post("http://localhost:5000/orders/getAll", model);//Backend'e userId gönderdik değerleri alabilmek için
        setOrders(response.data);
    }
    useEffect(()=>{
        getAll();
    },[])
 
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
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{order.products[0].name}</td>
                                                <td>{order.products[0].categoryName}</td>
                                                <td>{order.products[0].price}</td>
                                                <td>
                                                
                                            </td>
                                            </tr>
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