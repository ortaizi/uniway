// aiassistant.jsx
import React, { useState } from 'react';
import './aiassistant.css';

function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      const response = await fetch("http://192.168.1.141:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: "user123", // can be dynamic or hardcoded
          message: input
        })
      });

      const data = await response.json();

      if (data && data.length > 0) {
        const botReplies = data
          .filter(msg => msg.text)
          .map(msg => ({ sender: 'bot', text: msg.text }));

        setMessages(prev => [...prev, ...botReplies]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: "🤖 Sorry, I didn't understand that." }
        ]);
      }

    } catch (error) {
      console.error("Error communicating with Rasa:", error);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: "⚠️ Failed to reach the assistant." }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="ai-chat-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>
          <span>&uarr;</span>
        </button>
      </div>
    </div>
  );
}

export default AIAssistant;
