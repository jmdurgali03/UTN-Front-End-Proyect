import React, { useState } from 'react';
import './NewMessage.css';

const NewMessage = ({ workspace_id, channel_id, updateMessages }) => {

    const [messages, setMessages] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (messages.trim() === '') {
            return;
        }

        const newMessage = {
            id: Date.now(),
            author: 'You',
            img: '/img-user/You.jpg',
            text: messages,
            timestamp: new Date().toLocaleString()
        };

        updateMessages(newMessage);
        setMessages('');
    }

    return (
        <form onSubmit={handleSubmit} className='new-message-form'>
            <input
                type="text"
                value={messages}
                onChange={(event) => setMessages(event.target.value)}
                placeholder="Type your message here..."
                className='message-input'
            />
            <button type="submit" className='send-button'>Send</button>
        </form>
    )
}

export default NewMessage;