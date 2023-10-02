import React, { useState, useEffect } from 'react';
import './adminchat.css';
import axios from "axios";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');


function AdminChat() {
  const [selectedContact, setSelectedContact] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [groupedContacts, setGroupedContacts] = useState([]);
  const [receivedId, setReceivedId] = useState([]);
  const token = sessionStorage.getItem('token');

  //GETİRME
  const getAll = async () => {
    try {
      const response = await axios.get("http://localhost:5000/messages", {
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
    console.log("Seçilen ID:", id);
    setSelectedContact(id);
  };




  const handleSendMessage = async () => {
    const messageContent = {
      receivedId: selectedContact,
      message: newMessage,
      senderId: sessionStorage.getItem('id'),
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
          (contact.senderId!==sessionStorage.getItem('id')) ? (
          <div
            className={`contact ${selectedContact === contact.senderId ? 'selected' : ''}`}
            key={contact.senderId}
            onClick={() => SelectContact(contact.senderId)}>
            ({contact.senderId}), ({contact.total})
          </div>
          ):null
        ))}
      </div>
      <div className="message-container">
        <div className="message-list">
          {messages.map((message, index) => (
            <div className={`message ${message.senderId === selectedContact ? 'right' : 'left'}`} key={index}>
              {message.message}
            </div>
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
