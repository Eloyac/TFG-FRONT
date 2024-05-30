import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const Chat = ({ gameId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('joinGame', gameId);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leaveGame', gameId);
      socket.off('message');
    };
  }, [gameId]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', { gameId, text: message });
    setMessage('');
  };

  return (
    <div>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg.text} />
          </ListItem>
        ))}
      </List>
      <form onSubmit={sendMessage}>
        <TextField
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
