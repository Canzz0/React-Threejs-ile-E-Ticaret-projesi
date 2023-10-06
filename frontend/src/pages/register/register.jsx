import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2'yi içe aktarın

import './register.css'
function RegisterComponent() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    const [role, setRole] = useState("")
    const register = async (e) => {
        e.preventDefault();
        let model = { email: email, name: name, password: password, role: role };
        if (password === repassword & name !== '' & email !== '') {
            try {
                const response = await axios.post("http://localhost:5000/auth/register", model);  //AXİOS Üzerinden post işlemi yapıyoruz 
                sessionStorage.setItem("token", response.data.token);  //Localstoreage içine depolamak için
                sessionStorage.setItem("user", JSON.stringify(response.data.user)); //Önce jsona çevirip sonra yönlendiriyor
                sessionStorage.setItem("id", JSON.stringify(response.data.user._id));
                sessionStorage.setItem("admin", JSON.stringify(response.data.user.isAdmin));
                Swal.fire({
                    icon: 'success',
                    title: 'Başarılı!',
                    text: 'Kayıt İşlemi Başarılı!!',
                  });
                navigate('/');
              } catch (error) {
                Swal.fire({
                  icon: 'error',
                  title: 'Hata!',
                  text: 'Bilgilerinizi kontrol ediniz!!',
                });
                console.error(error);
              }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hata!',
                text: 'Bilgilerinizi kontrol ediniz!!',
              });
        }
    }

    return (
        <>
            <div className="mt-5 p-5 d-flex justify-content-center align-items-center ">
                <div className="col-md-5">
                    <div className="card ">
                        <div className="card-header reg-header">
                            <h1>Kayıt Olma Sayfası</h1>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={register} className="p-4">
                                <div className="form-group reg-element">
                                    <label htmlFor="email"><strong>E-Posta Adresi:</strong></label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email"
                                        className="form-control" />
                                </div>
                                <div className="form-group reg-element">
                                    <label htmlFor="name"><strong>Kullanıcı Adı:</strong></label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name"
                                        className="form-control" />
                                </div>
                                <div className="form-group reg-element">
                                    <label htmlFor="password"><strong>Şifre:</strong></label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password"
                                        className="form-control" />
                                </div>
                                <div className="form-group reg-element">
                                    <label htmlFor="re-password"><strong>Şifre-Tekrar:</strong></label>
                                    <input value={repassword} onChange={(e) => setRePassword(e.target.value)} type="password" id="re-password" name="re-password"
                                        className="form-control" />
                                </div>
                                <div className="form-group reg-element">
                                    <label htmlFor="Role">Rol Adı</label>
                                    <select value={role} onChange={(e) => setRole(e.target.value)} className='form-control'>
                                        <option value="satici">Satıcı</option>
                                        <option value="musteri">Müşteri</option>
                                    </select>
                                </div>
                                <div className="form-group mt-4">
                                    <button className="btn reg-btn w-100">
                                        Kayıt Ol
                                    </button>
                                </div>
                            </form>
                            <span className='span'>Hesabın var mı?</span>
                            <Link className='reg-link mt-3' to='/login'>Giriş Yap</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default RegisterComponent;