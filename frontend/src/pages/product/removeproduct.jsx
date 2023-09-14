import React from 'react'
import axios from "axios";
const removeProduct = (_id) => {
  
  const remove = async (_id) => {
    let confirm = window.confirm("Ürünü silmek istiyor musunuz?")
    if (confirm) {
      let model = { _id: _id };
      let response = await axios.post("http://localhost:5000/products/remove", model);
      alert(response.data.message);
      window.location.reload('/')

    }
  }
  
  return (
    <button onClick={() => remove(_id)} className='btn btn-outline-danger btn-sm'>
      Sil
    </button>
  )
}

export default removeProduct;