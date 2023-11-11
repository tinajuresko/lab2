import React, { useState } from 'react';
import './XSS.css';

function MyComponent() {
  const [message, setMessage] = useState('');
  const [secureMode, setSecureMode] = useState(false);
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    try {
      
      const userInputDiv = document.createElement('div');
      userInputDiv.innerHTML = secureMode ? sanitizeMessage(message) : message;
      setOutput(userInputDiv.outerHTML);
    } catch (error) {
      console.error('Error executing user input:', error);
    }
  };

  return (
    <div className="container">
      <h1>Cross-site scripting (XSS)</h1>
      <label className="checkbox-label">
        <input type="checkbox" onChange={() => setSecureMode(!secureMode)} /> Secure Mode
      </label>
      <input type="text" className="text-input" onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      <div id="output" dangerouslySetInnerHTML={{ __html: output }}></div>
      
    </div>
  );
}

function sanitizeMessage(input) {
  return input.replace(/<[^>]*>/g, ''); 
}

export default MyComponent;
