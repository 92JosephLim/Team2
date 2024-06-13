import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatRooms = ({ onEnterRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:80/api/chatrooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    try {
      await axios.post('http://localhost:80/api/chatrooms/create', null, {
        params: {
          name: roomName
        }
      });
      const response = await axios.get('http://localhost:80/api/chatrooms');
      setRooms(response.data);
      setRoomName('');
    } catch (error) {
      console.error('Room creation failed:', error);
    }
  };

  const enterRoom = (roomId) => {
    onEnterRoom(roomId);
    navigate(`/chatroom/${roomId}`);
  };

  return (
    <div>
      <h2>Chat Rooms</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} <button onClick={() => enterRoom(room.id)}>Enter</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRooms;
