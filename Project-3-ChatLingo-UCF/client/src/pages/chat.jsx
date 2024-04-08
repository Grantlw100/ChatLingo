import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Call the fetchMessages function
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (message.trim() !== '') {
      try {
        // Make a POST request to send the message
        await axios.post('/api/messages', { text: message });
        // Clear the input field after sending the message
        setMessage('');
        // Fetch updated messages after sending a new message
        fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {/* Displaying messages */}
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      {/* Input field for sending messages */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      {/* Button to send messages */}
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
