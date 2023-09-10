import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import './register.css'
function RegisterComponent(){
    const navigate = useNavigate();
    const [email,setEmail]=useState("")
    const [name,setName] = useState("")
    const [password,setPassword]=useState("")
    const register = async (e)=>{
        e.preventDefault();
        console.log(email,password)
        let model ={email:email,name:name,password:password};
        try {
            const response = await axios.post("http://localhost:5000/auth/register",model);  //AXİOS Üzerinden post işlemi yapıyoruz 
            sessionStorage.setItem("token",response.data.token);  //Localstoreage içine depolamak için
            sessionStorage.setItem("user",JSON.stringify(response.data.user)); //Önce jsona çevirip sonra yönlendiriyor
            sessionStorage.setItem("id",JSON.stringify(response.data.user._id));
            sessionStorage.setItem("admin",JSON.stringify(response.data.user.isAdmin));
            navigate("/"); //BU da bizi direkt anasayfaya yönlendirmek için
        }
        catch (error){
            console.error(error)
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
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" 
                        className="form-control"/>
                    </div>
                    <div className="form-group reg-element">
                        <label htmlFor="name"><strong>Kullanıcı Adı:</strong></label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name"
                        className="form-control"  />
                    </div>
                    <div className="form-group reg-element">
                        <label htmlFor="password"><strong>Şifre:</strong></label>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password"
                        className="form-control"  />
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