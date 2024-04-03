import React, { useState, useEffect } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es'); // default target language: Spanish

  useEffect(() => {
    // Function to translate text using Google Translate API
    const translateText = async () => {
      const apiKey = '';
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: inputText,
            target: targetLanguage,
          }),
        }
      );
      const data = await response.json();
      setTranslatedText(data.data.translations[0].translatedText);
    };

    // Call translateText function whenever inputText or targetLanguage changes
    if (inputText) {
      translateText();
    }
  }, [inputText, targetLanguage]);

  const handleMessageSend = () => {
    setMessages([...messages, translatedText]);
    setInputText('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        {/* Add more languages as needed */}
      </select>
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default ChatApp;
