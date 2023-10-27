import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert2'yi içe aktarın
import 'sweetalert2/dist/sweetalert2.min.css'; // SweetAlert2 stil dosyasını dahil edin
import './login.css';

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const login = async (e) => {
    e.preventDefault(); // Sayfa yenilemeyi engelle
    if (password === repassword && email !== '') {
      try {
        let model = { email: email, password: password };
        let response = await axios.post('http://localhost:5000/login', model);
        sessionStorage.setItem('token', response.data.token);
        Swal.fire({
            icon: 'success',
            title: 'Başarılı!',
            text: 'Giriş İşlemi Başarılı!!',
          });
        navigate('/');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Hata!',
          text: 'Şifrenizi ve E-Postanızı kontrol ediniz!!',
        });
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="mt-5 p-5 d-flex justify-content-center align-items-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header log-header">
              <h1>Giriş Sayfası</h1>
            </div>
            <div className="card-body p-4">
              <form onSubmit={login} className="p-4">
                <div className="form-group log-element">
                  <label htmlFor="email">
                    <strong>E-Posta Adresi:</strong>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                  />
                </div>
                <div className="form-group log-element">
                  <label htmlFor="password">
                    <strong> Şifre:</strong>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                  />
                </div>
                <div className="form-group log-element">
                  <label htmlFor="re-password">
                    <strong> Şifre-Tekrar:</strong>
                  </label>
                  <input
                    value={repassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    type="password"
                    id="re-password"
                    name="re-password"
                    className="form-control"
                  />
                </div>
                <div className="form-group mt-4">
                  <button className="btn log-btn w-100">Giriş Yap</button>
                </div>
              </form>
              <span className="span">Hala kayıt olmadın mı ?</span>
              <Link className="log-link mt-3" to="/register">
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
