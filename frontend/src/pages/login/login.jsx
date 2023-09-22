import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './login.css'
function LoginComponent() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    const login = async (e) => {
        e.preventDefault(); //Sayfa yenileme engelleme
        if (password === repassword & email !== '') {
            try {
                let model = { email: email, password: password };   //Kullanıcının girdiği değerleri modele kaydediyoruz
                let response = await axios.post("http://localhost:5000/auth/login", model);  //Axios ile post işlemini yapıyoruz
                sessionStorage.setItem("token", response.data.token);     //sessionStorage 'de girilen değerleri tutuyoruz
                sessionStorage.setItem("userName", JSON.stringify(response.data.user.name));
                sessionStorage.setItem("admin", JSON.stringify(response.data.user.isAdmin));
                sessionStorage.setItem("id", JSON.stringify(response.data.user._id));
                navigate("/");  //Direkt anasayfaya yönlendiriyoruz
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <>

            <div className="mt-5 p-5 d-flex justify-content-center align-items-center ">
                <div className="col-md-5">
                    <div className="card ">
                        <div className="card-header log-header">
                            <h1>Giriş Sayfası</h1>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={login} className='p-4'>
                                <div className="form-group log-element">
                                    <label htmlFor="email"><strong>E-Posta Adresi:</strong></label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email"
                                        className="form-control" />
                                </div>
                                <div className="form-group log-element">
                                    <label htmlFor="password"><strong> Şifre:</strong></label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password"
                                        className="form-control" />
                                </div>
                                <div className="form-group log-element">
                                    <label htmlFor="re-password"><strong> Şifre-Tekrar:</strong></label>
                                    <input value={repassword} onChange={(e) => setRePassword(e.target.value)} type="password" id="re-password" name="re-password"
                                        className="form-control" />
                                </div>
                                <div className="form-group mt-4">
                                    <button className="btn log-btn w-100">
                                        Giriş Yap
                                    </button>
                                </div>
                            </form>
                            <span className='span'>Hala kayıt olmadın mı ?</span>
                            <Link className='log-link mt-3' to='/register'>Kayıt Ol</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginComponent;