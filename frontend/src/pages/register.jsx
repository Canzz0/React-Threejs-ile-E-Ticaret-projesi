import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
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
            localStorage.setItem("token",response.data.token);  //Localstoreage içine depolamak için
            localStorage.setItem("user",JSON.stringify(response.data.user)); //Önce jsona çevirip sonra yönlendiriyor
            console.log(response) 
            navigate("/"); //BU da bizi direkt anasayfaya yönlendirmek için
        }
        catch (error){
            console.error(error)
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
                <form onSubmit={register}>
                    <div className="form-group">
                        <label htmlFor="email">Mail Adresi</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" 
                        className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Kullanıcı Adı</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name"
                        className="form-control"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Şifre</label>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password"
                        className="form-control"  />
                    </div>
                    <div className="form-group mt-2">
                        <button className="btn btn-outline-success w-100">
                            Kayıt Ol
                        </button>
                        <Link to='/login'>Giriş Yap</Link>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>

        </>
    )
}


export default RegisterComponent;