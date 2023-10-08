import { useEffect } from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import ProductSearch from './searchproduct/searchproduct';
import Swal from 'sweetalert2'; // SweetAlert2'yi içe aktarın
import 'sweetalert2/dist/sweetalert2.min.css'; // SweetAlert2 stil dosyasını dahil edin
function LayoutComponent(){
    const navigate = useNavigate();
    let isAdmin = false;
    const logout = () =>{
        navigate("/login");
     
    }
    useEffect(() => {

        if(!sessionStorage.getItem('token')){
            navigate("/login");
            Swal.fire({
                icon: 'error',
                title: 'Hata!',
                text: 'Lütfen Giriş Yapın!!',
              });
        }
    })

    
    return (
        <>
          <nav className="navbar navbar-expand-lg mt-2  ">
        <div className="container-fluid">

            <a href="#" className="navbar-brand">E-TİCARET</a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                    <Link to="/home" className="nav-item nav-link navbar-dark">Anasayfa</Link>
                    <Link to="/products" className="nav-item nav-link navbar-dark">Ürün Ekle</Link>
                    <Link to="/shop" className="nav-item nav-link navbar-dark">Alışveriş</Link>
                    <Link to="/basket" className="nav-item nav-link navbar-dark">Sepetim</Link>
                </div>
                <div className="navbar-nav">
                <ProductSearch />
                </div>
                
                <div className="navbar-nav ms-auto">
                    <Link to="#" className="nav-item nav-link"><strong><i className="bi bi-person"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                      </svg></i>
                    </strong></Link>
                    <a  onClick={logout} href="/login" className="nav-item nav-link"><strong><i className="bi bi-box-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                      </svg></i></strong></a>
                </div>
            </div>
        </div>
    </nav>
    <Outlet/>
        </>
        
    )
}

export default LayoutComponent;

//LİNK'leri componentler arası geçiş için kullandık