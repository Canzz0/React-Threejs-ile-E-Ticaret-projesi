import React, { useState } from 'react';
import './adminchat.css';

function AdminChat() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Kişi 1' },
    { id: 2, name: 'Kişi 2' },
    { id: 3, name: 'Kişi 3' },
    // Diğer kişileri burada listeye ekleyin
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([
        ...messages,
        { text: newMessage, type: 'sent', contactId: selectedContact },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="App">
      <div className="contact-list">
        {contacts.map((contact) => (
          <div
            className={`contact ${selectedContact === contact.id ? 'selected' : ''}`}
            key={contact.id}
            onClick={() => setSelectedContact(contact.id)}
          >
            {contact.name}
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
