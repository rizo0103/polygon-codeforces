/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const Main = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:3000/compile', {
              code,
              input
          });
          setOutput(response.data.output);
          setError('');
      } catch (err) {
          setOutput('');
          setError(err.response.data.error);
      }
  };

  return (
      <div>
          <h1>Code Compiler</h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="code">Code:</label>
                  <textarea id="code" value={code} onChange={(e) => setCode(e.target.value)} rows="10" cols="50"></textarea>
              </div>
              <div>
                  <label htmlFor="input">Input (optional):</label>
                  <textarea id="input" value={input} onChange={(e) => setInput(e.target.value)} rows="5" cols="50"></textarea>
              </div>
              <button type="submit">Submit</button>
          </form>
          <div>
              <h2>Output</h2>
              <pre>{output}</pre>
              {error && <pre style={{ color: 'red' }}>{error}</pre>}
          </div>
      </div>
  );
}

export default Main
