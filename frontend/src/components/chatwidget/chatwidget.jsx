import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getUser } from "../../redux/features/tokenmatch/tokenmatch";
import "./chatwidget.css";
const socket = io('http://localhost:3001'); // Sunucu adresine göre güncelleyin

function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [userData, setUserData] = useState([]);
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);


  //Kullanıcı bilgilerini getirmek ve redux'ta saklamak için
  useEffect(() => {
      dispatch(getUser(token));
  }, [dispatch, token]);


  //Bilgileri kayıt etmek için kullanılır
  useEffect(() => {
      if (user.data) {
          setUserData(user.data);
        
      }
  }, [user]);

  useEffect(() => {
    socket.on('returnMessage', (message) => {
      setMessageList((prev) => [...prev, message])
    })
  }, [socket])

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSendMessage = async () => {
    const messageContent = {
      receivedId: 'admin',
      message: message,
      senderId: userData._id,
      date: (new Date(Date.now)).getHours() + ':' + (new Date(Date.now)).getMinutes(),
      seen: false
    }
    socket.emit('message', messageContent);
    setMessageList((prev) => [...prev, messageContent])
    setMessage('')
  }

  return (
    <div className={`chat ${chatOpen ? 'open' : ''}`}>
      <div onClick={toggleChat} className="title">
        Destek Hattı
        {chatOpen && (
          <button className="btn-close" onClick={toggleChat}>
            X
          </button>
        )}
      </div>
      {chatOpen && (
        <div className="content mb-2">
          <div className="message-list">
          {messageList.map((msg, index) => (
            (msg.receivedId===userData._id) ? (
              <div className='chat-bubble left' key={index}>
                <p>{msg.message}</p>
              </div>
            ) : (msg.senderId===userData._id) ? (
              <div className='chat-bubble right' key={index}>
                <p>{msg.message}</p>
              </div>
            ) : null
            ))}
          </div>
          <div className="message-form mb-2 pb-2">
            <textarea
              type="text"
              placeholder="Mesajınızı yazın"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>
              Gönder
            </button>
          </div>
        </div>
      )
      }
    </div >
  );
}

export default ChatWidget;
