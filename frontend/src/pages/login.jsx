import {Link, Navigate, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
function LoginComponent(){
    const navigate = useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const login = async (e)=>{
        e.preventDefault(); //SAyfa yenileme engelleme
        try{
           let model = {email:email,password:password};   //Kullanıcının girdiği değerleri modele kaydediyoruz
           let response = await axios.post("http://localhost:5000/auth/login",model);  //Axios ile post işlemini yapıyoruz
            localStorage.setItem("token",response.data.token);     //LocalStorage 'de girilen değerleri tutuyoruz
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/");  //Direkt anasayfaya yönlendiriyoruz
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <>
    <div className="d-flex justify-content-center">
        <div className="col-md-5">
            <div className="card">
                <div className="card-header">
                    <h1>Giriş Sayfası</h1>
                </div>
            <div className="card-body">
                <form onSubmit={login}>
                    <div className="form-group">
                        <label htmlFor="email">Mail Adresi</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" 
                        className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Şifre</label>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password"
                        className="form-control"  />
                    </div>
                    <div className="form-group mt-2">
                        <button className="btn btn-outline-primary w-100">
                            Giriş Yap
                        </button>
                        <Link to='/register'>Kayıt Ol</Link>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>

        </>
    )
}

export default LoginComponent;