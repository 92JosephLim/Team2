import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  // useParams 훅을 사용하여 URL 파라미터에서 roomId를 가져옵니다.
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]); // 채팅 메시지를 저장하는 상태 변수
  const [input, setInput] = useState(''); // 입력 필드의 값을 저장하는 상태 변수
  const [stompClient, setStompClient] = useState(null); // Stomp 클라이언트를 저장하는 상태 변수
  const [isConnected, setIsConnected] = useState(false); // 연결 상태를 저장하는 상태 변수

  useEffect(() => {
    // SockJS와 Stomp를 사용하여 WebSocket 연결을 설정합니다.
    const socket = new SockJS('http://localhost:8080/chat');
    const client = Stomp.over(socket);

    // Stomp 클라이언트를 연결하고 메시지를 구독합니다.
    client.connect({}, () => {
      client.subscribe(`/topic/rooms/${roomId}`, (message) => {
        setMessages((prevMessages) => [...prevMessages, message.body]); // 새로운 메시지를 상태에 추가합니다.
      });
      setIsConnected(true); // 연결 상태를 true로 설정합니다.
    });

    client.onclose = () => {
      setIsConnected(false); // 연결이 닫히면 연결 상태를 false로 설정합니다.
    };

    setStompClient(client); // Stomp 클라이언트를 상태에 저장합니다.

    // 컴포넌트가 언마운트될 때 Stomp 클라이언트를 disconnect합니다.
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [roomId]); // roomId가 변경될 때마다 useEffect가 다시 실행됩니다.

  // 메시지를 전송하는 함수입니다.
  const sendMessage = () => {
    if (isConnected && input.trim() !== '') {
      const message = { content: input }; // 입력 필드의 값을 JSON 형식으로 생성합니다.
      stompClient.send(`/app/rooms/${roomId}/message`, {}, JSON.stringify(message)); // 메시지를 전송합니다.
      setInput(''); // 입력 필드를 비웁니다.
    }
  };

  return (
    <div>
      <h2>Chat Room {roomId}</h2> {/* 현재 채팅방 ID를 표시합니다. */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li> // 각 메시지를 목록 항목으로 표시합니다.
        ))}
      </ul>
      <input
        type="text"
        value={input} // 입력 필드의 값을 상태와 연결합니다.
        onChange={(e) => setInput(e.target.value)} // 입력 필드의 값이 변경될 때 상태를 업데이트합니다.
        onKeyPress={(e) => {
          if (e.key === 'Enter') sendMessage(); // Enter 키를 누르면 메시지를 전송합니다.
        }}
      />
      <button onClick={sendMessage}>Send</button> {/* 클릭하면 메시지를 전송합니다. */}
    </div>
  );
};

export default ChatRoom;
