import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(''); // 사용자 ID를 저장하는 상태 변수
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:80/chat');
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
    if (isConnected && input.trim() !== '' && userId.trim() !== '') {
      const message = { content: `${userId}: ${input}` }; // 메시지 형식 설정
      stompClient.send(`/app/rooms/${roomId}/message`, {}, JSON.stringify(message));
      setInput('');
    }
  };

  return (
    <div>
      <h2>Chat Room {roomId}</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter your ID" // 사용자 ID 입력 필드
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your message"
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
