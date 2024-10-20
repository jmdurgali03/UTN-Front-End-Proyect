import React from 'react';
import './MessagesList.css';

const MessagesList = ({ messages, channelName }) => {
    return (

        <>
            <nav className='nav-channel-title'>
                <h4 className='channel-title'>{channelName}</h4>
            </nav>

            <div className='messages-list-container'>
                {
                    messages.length > 0
                        ? (
                            messages.map((message) => {
                                return (
                                    <div className='message-item' key={message.id}>
                                        <img src={message.img} alt="user img" className='message-img' />
                                        <div className='message-content'>
                                            <div className='message-header'>
                                                <span className='message-author'>{message.author}</span>
                                                <span className='message-time'>{message.timestamp}</span>
                                            </div>
                                            <div className='message-text'>{message.text}</div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <span className='no-messages'>No messages in this channel.</span>
                        )
                }
            </div>
        </>
    )
}

export default MessagesList;