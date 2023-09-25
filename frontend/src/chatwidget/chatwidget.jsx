import React, { useState, useEffect } from 'react';
import "./chatwidget.css";
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Sunucu adresine göre güncelleyin

function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [firstMessage, setFirstMessage] = useState(true);

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
      sent: 'admin',
      message: message,
      sender: sessionStorage.getItem('id'),
      date: (new Date(Date.now)).getHours() + ':' + (new Date(Date.now)).getMinutes(),
      seen:false
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
            msg.sender ? (
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
