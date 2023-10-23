import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getUser } from "../../../redux/features/tokenmatch/tokenmatch";
import './adminchat.css';
const socket = io('http://localhost:3001');


function AdminChat() {
  const [userDataId, setUserDataId] = useState('');
  const [selectedContact, setSelectedContact] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [groupedContacts, setGroupedContacts] = useState([]);
  const [receivedId, setReceivedId] = useState([]);
  const [userInfo,setUserInfo] = useState([]);
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  //GETİRME
  const getAll = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getmessage", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessages(response.data);
      
    } catch (error) {
      console.error('Hata:', error);
    }
  }

  const SelectContact = (id) => {
    setSelectedContact(id);
  };

  //Kullanıcı bilgilerini getirmek ve redux'ta saklamak için
  useEffect(() => {
    dispatch(getUser(token));
}, [dispatch, token]);


//Bilgileri kayıt etmek için kullanılır
useEffect(() => {
    if (user.data) {
        setUserDataId(user.data._id);

    }
}, [user]);

  console.log(userDataId)
  const handleSendMessage = async () => {
    const messageContent = {
      receivedId: selectedContact,
      message: newMessage,
      senderId: 'admin',
      date: (new Date(Date.now)).getHours() + ':' + (new Date(Date.now)).getMinutes(),
      seen: false
    }
    socket.emit('message', messageContent);
    setMessages((prev) => [...prev, messageContent])
    setNewMessage('')
  }


  const groupMessageContact = (messages) => {
    const groupedContact = {};
    messages.forEach((message) => {
      const { receivedId, senderId } = message;
      if (!groupedContact[senderId]) {
        groupedContact[senderId] = {
          receivedId: receivedId,
          senderId: senderId,
          total: 1,
        };
        setReceivedId(groupedContact[senderId])
      } else {
        groupedContact[senderId].total += 1;

      }
    });


    return Object.values(groupedContact);

  };
  useEffect(() => {

    getAll();
    document.title = 'AdminChat';
    const groupContacts = groupMessageContact(messages);
    setGroupedContacts(groupContacts);
  }, [messages]);



  return (
    <div className="App">
      <div className="contact-list">
        {groupedContacts.map((contact) => (
          (contact.senderId !== 'admin' && contact.senderId !== '"'+userDataId+'"') ? (
            <div
              className={`contact ${selectedContact === contact.senderId ? 'selected' : ''}`}
              key={contact.senderId}
              onClick={() => SelectContact(contact.senderId)}>
              ({contact.senderId})
            </div>
          ) : null
        ))}
      </div>
      <div className="message-container">
        <div className="message-list">
          {messages.map((message, index) => (
            (message.receivedId === 'admin' && message.senderId == selectedContact) ? (
              <div className='messages left' key={index}>
                <p>{message.message}</p>
              </div>
            ) : (message.senderId === 'admin' && message.receivedId == selectedContact) ? (
              <div className='messages right' key={index}>
                <p>{message.message}</p>
              </div>
            ) : null
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Mesajınızı yazın"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Gönder</button>
        </div>
      </div>
    </div>
  );
}

export default AdminChat;
