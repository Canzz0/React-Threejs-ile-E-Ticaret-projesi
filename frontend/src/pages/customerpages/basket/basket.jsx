import { useEffect, useState } from "react";
import axios from "axios";
import './basket.css';
function BasketComponent() {
    const [baskets, setBaskets] = useState([]);  //Basket değerleri alma güncelleme için
    const [total, setTotal] = useState(0);
    const getAll = async () => {
        let userid = JSON.parse(sessionStorage.getItem("id"));
        let model = { userId: userid };//bunu backend'e göndermek için yaptık
        let response = await axios.post("http://localhost:5000/baskets/getAll", model);//Backend'e userId gönderdik değerleri alabilmek için
        setBaskets(response.data);

        //TOPLAMLARI GÖSTERME
        let totalC = 0;
        for (let i = 0; i < response.data.length; i++) { //Response data çekme sebebimiz response data sürekli güncellendiği için en doğru sonucu verecektir.
            totalC += response.data[i].products[0].price;
        }
        setTotal(totalC);

    }

    //Remove işlemi
    const remove = async (_id) => {
        let confirm = window.confirm("Ürünü Silmek İstediğinize Emin misiniz?");
        if (confirm) {
            let model = { _id: _id };
            await axios.post("http://localhost:5000/baskets/remove", model);
            getAll();
            window.location.reload()
        }
    }

    //Sipariş Oluşturma
    const addOrder = async () => {
        let userid = JSON.parse(sessionStorage.getItem("id"));
        let model = { userId: userid };
        await axios.post("http://localhost:5000/orders/add", model);
        alert('Siparişiniz Oluşturuldu');
        window.location.reload('/')

    }



    useEffect(() => {
        getAll();
    }, [])

    return (
    <>
        <title>Sepetim</title>
        <div className="m-5 mt-2">
            <div className="card basket-place">
                <div className="card-header basket-header">
                    <h1>Sepetteki Ürünler</h1>
                </div>
                <div className="card-body basket-body ">
                    <div className="row ">
                        <div className="col-md-8">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th></th>
                                        <th>Ürün Adı</th>
                                        <th>Kategori Adı</th>
                                        <th>Fiyatı</th>
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {baskets.map((basket, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img style={{ width: "250px" }} src={'http://localhost:5000/' + basket.products[0].imageUrl} />
                                            </td>
                                            <td>{basket.products[0].name}</td>
                                            <td>{basket.products[0].categoryName}</td>
                                            <td>{basket.products[0].price}</td>
                                            <td>
                                                <button onClick={() => remove(basket._id)} className='btn btn-outline-danger w-100'>
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-4">
                            <div className="card  price-place">
                                <div className="card-header basket-header ">
                                    <h4 className="text-center">Sepet
                                        Toplamı</h4>
                                </div>
                                <p className="text-center">Toplam Ürün Sayısı:{baskets.length}</p>
                                <h4 className="text-center price">Toplam Tutar:{total}</h4>
                                <div className="justify-content-center d-flex">
                                <button onClick={addOrder} className="btn mt-4 button "> Ödeme Yap</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BasketComponent;