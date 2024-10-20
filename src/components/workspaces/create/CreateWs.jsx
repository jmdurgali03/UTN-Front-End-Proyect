import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validateWorkspace } from '../../../validations/validationsWs';
import { validateChannel } from '../../../validations/validationsCh';
import randomImage from '../../../../assets/images/randomImage';
import './CreateWs.css';

const CreateWs = () => {

    const [workspaceName, setWorkspaceName] = useState('');
    const [channelName, setChannelName] = useState('#');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();

        const savedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];

        const error_workspace = validateWorkspace(workspaceName, savedWorkspaces);

        if (error_workspace) {
            setErrorMessage(error_workspace);
            return;
        }

        const error_channel = validateChannel(channelName, savedWorkspaces);

        if (error_channel) {
            setErrorMessage(error_channel);
            return;
        }

        const newWorkspace = {
            id: Date.now(),
            name: workspaceName,
            img: randomImage(),
            channels: [
                {
                    id: Date.now(),
                    name: channelName,
                    messages: []
                }
            ]
        };

        const updatedWorkspaces = [...savedWorkspaces, newWorkspace];
        localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces));

        navigate('/');
    };

    return (
        <>
            <div className='new-workspace-container'>
                <h2>Create New Workspace</h2>

                <form onSubmit={handleSubmitForm}>
                    <div className='form-input'>
                        <label htmlFor="name-workspace">Workspace Name</label>
                        <input
                            id='name-workspace'
                            name='name-workspace'
                            type="text"
                            placeholder='Workspace Name...'
                            value={workspaceName}
                            onChange={(event) => setWorkspaceName(event.target.value)}
                        />
                    </div>

                    <div className='form-input'>
                        <label htmlFor="channel-workspace">Workspace Channel</label>
                        <input
                            id='channel-workspace'
                            name='channel-workspace'
                            type="text"
                            placeholder='Channel...'
                            value={channelName}
                            onChange={(event) => setChannelName(event.target.value)}
                        />
                    </div>

                    {
                        errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>
                    }

                    <div className='form-btn'>
                        <button>Create</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateWs