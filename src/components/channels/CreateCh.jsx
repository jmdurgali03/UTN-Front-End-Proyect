import React, { useState } from 'react';
import hookWorkspace from '../../fetching/hookWorkspace';
import { validateChannel } from '../../validations/validationsCh';
import './CreateCh.css';

const CreateCh = ({ workspace_id, addNewChannel }) => {
    const [newChannel, setNewChannel] = useState(false);
    const [channelName, setChannelName] = useState('#');
    const [errorMessage, setErrorMessage] = useState('');

    const { workspaces, isLoading } = hookWorkspace();

    if (isLoading) {
        return <span className='span-loading'>Loading workspaces...</span>;
    }

    const toggleNewChannel = () => {
        setNewChannel(!newChannel);
        setChannelName('#');
        setErrorMessage('');
    };

    const handleCreateNewChannel = (event) => {
        event.preventDefault();

        const error = validateChannel(channelName, workspaces);
        if (error) {
            setErrorMessage(error);
            return;
        }

        setErrorMessage('');

        const newChannel = {
            id: Date.now(),
            name: channelName.trim(),
            messages: []
        };

        addNewChannel(newChannel);
        setNewChannel(false);
    }


    return (
        <div className='channel-container'>
            <button onClick={toggleNewChannel} className='toggle-channel-btn'>
                Add New Channel
                {
                    newChannel
                        ? <i className="fa-solid fa-xmark"></i>
                        : <i className="fa-solid fa-plus"></i>
                }
            </button>

            {newChannel && (
                <form onSubmit={handleCreateNewChannel} className='new-channel-form'>
                    <input
                        className='channel-input'
                        type="text"
                        placeholder="Channel Name"
                        value={channelName}
                        onChange={(event) => {
                            setChannelName(event.target.value);
                            setErrorMessage('');
                        }}
                    />
                    <div className='form-btns'>
                        <button type='submit' className='submit-btn'>Create</button>
                        <button
                            onClick={() => toggleNewChannel()}
                            type='button'
                            className='cancel-btn'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
    );
}

export default CreateCh;
