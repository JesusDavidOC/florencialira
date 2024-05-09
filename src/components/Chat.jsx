import React, { useState, useEffect } from 'react';

const Chat = ({messages, sendMessage}) => {
  
  const [inputValue, setInputValue] = useState('');



  return (
    <div>
      <h2>Chat</h2>
      <div style={{ height: '500px', width: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>
             ({message.timestamp})
            <strong>{message.name}</strong>: {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={() =>{
         sendMessage(inputValue)
         setInputValue("")
         }}>Enviar</button>
    </div>
  );
};

export default Chat;

// FALTA HACER LOS MENSAJES AUTOMÁTICOS DE LOS TRENES.