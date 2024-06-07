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
      <List className='h-64 w-full block ' > 
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg.text} />
          </ListItem>
        ))}
      </List>
      <form onSubmit={sendMessage} className="flex mt-4">
        <TextField
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
          className="mr-2"
        />
        <Button type="submit" className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"'>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
