import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/chat');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/topic/rooms/${roomId}`, (message) => {
        setMessages((prevMessages) => [...prevMessages, message.body]);
      });
      setIsConnected(true);
    });

    client.onclose = () => {
      setIsConnected(false);
    };

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [roomId]);

  const sendMessage = () => {
    if (isConnected && input.trim() !== '') {
      const message = { content: input }; // 메시지를 JSON 형식으로 생성
      stompClient.send(`/app/rooms/${roomId}/message`, {}, JSON.stringify(message));
      setInput('');
    }
  };

  return (
    <div>
      <h2>Chat Room {roomId}</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') sendMessage();
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
