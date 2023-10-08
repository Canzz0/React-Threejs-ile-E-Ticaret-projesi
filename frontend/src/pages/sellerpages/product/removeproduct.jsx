import React from 'react'
import axios from "axios";
import Swal from 'sweetalert2'; // SweetAlert2'yi içe aktarın
import { toast } from 'react-toastify'; // react-toastify'yi içe aktarın
const removeProduct = (_id) => {
  
  const remove = async (_id) => {
    const result = await Swal.fire({
      title: 'Ürünü Silme',
      text: 'Ürünü silmek istiyor musunuz?',
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonText: 'Evet', 
      cancelButtonText: 'Hayır', 
    });
  
    if (result.isConfirmed) {
      let model = { _id: _id };
      try {
        let response = await axios.post("http://localhost:5000/removeproduct", model);
        toast.success(response.data.message, {
          autoClose: 1300,
        });
        window.location.reload('/');
      } catch (error) {
        toast.error('Bir hata oluştu.', {
          autoClose: 1300,
        });
        console.error(error);
      }
    }
  }
  
  return (<>
  
<button onClick={() => remove(_id)} className='btn btn-outline-danger btn-sm'>
  Sil
</button>
  </>
  
  )
}

export default removeProduct;