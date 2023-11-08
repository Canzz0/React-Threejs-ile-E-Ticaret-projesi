import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getUser } from '../../redux/features/tokenmatch/tokenmatch';
import './updateuser.css';

const UpdateUser = () => {
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState('');
  const [newName, setNewName] = useState('');
  const [newMail, setNewMail] = useState('');
  const [passwordInt, setPasswordInt] = useState('');
  const [rePasswordInt, setRePasswordInt] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (user.data) {
      setUserData([user.data]);
      setUserId(user.data._id);
      setNewName(user.data.name);
      setNewMail(user.data.email);
    }
  }, [user]);



  const sendUpdateUser = async () => {
    if (passwordInt) {
      if (passwordInt === rePasswordInt) {
        setNewPassword(passwordInt)
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: 'Parolalar eşleşmiyor',
          timer: 1300,
        });
        return;
      }
    }

    try {
      let model = {
        id: userId,
      };
      if (newName) {
        model.name = newName;
      }
      if (newMail) {
        model.email = newMail;
      }
      if (newPassword) {
        model.password = newPassword;
      }
      var response = await axios.post("http://localhost:5000/updateuser", model);
      setNewName('');
      setNewMail('');
      setNewPassword('');
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
        timer: 1300,
      });

      window.location.reload('/');
    } catch (error) {
      console.error(error.response.data.error);

      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: error.response.data.error,
        timer: 1300,
      });
    }
  }
  if (!userData) {
    return (
      <>
        <div>Yükleniyor</div>
      </>
    );
  }
  console.log(newPassword)
  return (
    <>
      <div className="container update-place">
        <div className="card">
          <div className="card-title mt-2 text-center">
            <h1>Bilgilerinizi Güncelleyiniz</h1>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Adınız:</label>
                <input
                  type="text"
                  onChange={(e) => setNewName(e.target.value)}
                  className="form-control"
                  id="name"
                  value={newName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-postanız:</label>
                <input
                  type="text"
                  onChange={(e) => setNewMail(e.target.value)}
                  className="form-control"
                  id="mail"
                  value={newMail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Şifreniz:</label>
                <input
                  type="password"
                  onChange={(e) => setPasswordInt(e.target.value)}
                  className="form-control"
                  id="password"

                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Şifre Tekrar:</label>
                <input type="password" onChange={(e) => setRePasswordInt(e.target.value)}
                  className="form-control" id="re-password" />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                onClick={() => { sendUpdateUser() }}
              >
                Güncelle
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
