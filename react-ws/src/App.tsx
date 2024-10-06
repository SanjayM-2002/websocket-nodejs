import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  useEffect(() => {
    const ws: WebSocket = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      console.log('Connected to server .....');
      setSocket(ws);
    };
    ws.onmessage = (message) => {
      console.log('Received message .....', message.data);
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };
    return () => {
      ws.close();
    };
  }, []);
  if (!socket) {
    return (
      <>
        <div>Loading.....</div>
      </>
    );
  }
  return (
    <>
      <div>Hello world</div>
      <div>
        <input
          type='text'
          placeholder='Enter message'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => {
            socket.send(text);
            setText('');
          }}
        >
          Send
        </button>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </>
  );
}

export default App;
