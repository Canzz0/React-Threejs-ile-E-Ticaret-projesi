import React, { useState, useEffect } from 'react';
import './adminchat.css';
import axios from "axios";

function AdminChat() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [groupedContacts, setGroupedContacts] = useState([]); // Add state for grouped contacts

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

  useEffect(() => {
    getAll();
    document.title = 'AdminChat';

    // Group messages by sender
    const groupContacts = groupMessageContact(messages);
    setGroupedContacts(groupContacts);
  }, [messages]); // Update grouped contacts when messages change

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([
        ...messages,
        { text: newMessage, type: 'sent', contactId: selectedContact },
      ]);
      setNewMessage('');
    }
  };

  const groupMessageContact = (messages) => {
    const groupedContact = {};
    messages.forEach((message) => {
      const { senderId } = message;
      if (!groupedContact[senderId]) {
        groupedContact[senderId] = {
          senderId: senderId,
          total: 1,
        };
      } else {
        groupedContact[senderId].total += 1;
      }
    });
    console.log(groupedContact)

    return Object.values(groupedContact);
  };
  return (
    <div className="App">
      <div className="contact-list">
        {groupedContacts.map((contact) => (
          <div
            className={`contact ${selectedContact === contact.senderId ? 'selected' : ''}`}
            key={contact._id}
            onClick={() => setSelectedContact(contact.senderId)}>
            {contact.senderId} ({contact.total})
          </div>
        ))}
      </div>
      <div className="message-container">
        <div className="message-list">
          {messages
            .filter((message) => message.contactId === selectedContact)
            .map((message, index) => (
              <div className={`message ${message.type}`} key={index}>
                {message.text}
              </div>
            ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Mesajınızı yazın..."
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
