import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CreateCh from '../channels/CreateCh';
import hookWorkspace from '../../fetching/hookWorkspace';
import MessagesList from '../messages/list/MessagesList';
import NewMessage from '../messages/new/NewMessage';
import './Workspace.css';

const Workspace = () => {

    const { workspace_id, channel_id } = useParams();
    const { workspaces: initialWorkspaces, isLoading } = hookWorkspace();
    const [workspaces, setWorkspaces] = useState(initialWorkspaces);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    // update workspaces state when hook is called
    useEffect(() => {
        setWorkspaces(initialWorkspaces);
    }, [initialWorkspaces]);

    if (isLoading) {
        return <span className='span-loading'>Loading...</span>
    };

    // get workspace and channel.
    const workspaceSelected = workspaces.find((workspace) => workspace.id === Number(workspace_id));
    if (!workspaceSelected) {
        return <span>Workspace not found</span>;
    };

    const channelSelected = workspaceSelected.channels.find((channel) => channel.id === Number(channel_id));
    if (!channelSelected) {
        return <span>Channel not found</span>;
    };

    const addNewChannel = (newChannel) => {
        const updateWorkspaces = workspaces.map((workspace) => {
            if (workspace.id === workspaceSelected.id) {
                return {
                    ...workspace,
                    channels: [...workspace.channels, newChannel]
                };
            }
            return workspace;
        });

        setWorkspaces(updateWorkspaces);
        localStorage.setItem('workspaces', JSON.stringify(updateWorkspaces));
        // save the changes on the localStorage
    };

    const updateMessages = (newMessage) => {
        const updateWorkspaces = workspaces.map((workspace) => {
            if (workspace.id === workspaceSelected.id) {
                return {
                    ...workspace,
                    channels: workspace.channels.map((channel) => {
                        if (channel.id === channelSelected.id) {
                            return {
                                ...channel,
                                messages: [...channel.messages, newMessage]
                            };
                        }
                        return channel;
                    })
                };
            }
            return workspace;
        });

        setWorkspaces(updateWorkspaces);
        localStorage.setItem('workspaces', JSON.stringify(updateWorkspaces));
        // save the changes on the localStorage
    }

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    }


    return (
        <>
            <div className="workspace-div">
                <main className='workspace-main'>
                    <button className="sideber-btn" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <h2>{workspaceSelected.name}</h2>
                    <Link to='/'>
                        <button className="exit-button">Exit</button>
                    </Link>
                </main>

                <div className="workspace-container">
                    <div className={`workspace-container-channels-sidebar ${sidebarVisible ? '-visible' : '-hidden'}`}>
                        <h4>Channels</h4>
                        <ul className="channel-list">
                            {workspaceSelected.channels.map((channel) => (
                                <li key={channel.id}>
                                    <Link to={`/workspace/${workspace_id}/${channel.id}`}>
                                        <span className="channel-hash"></span>
                                        {channel.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <span className="add-channel">+
                            <CreateCh workspaceID={workspaceSelected.id} addNewChannel={addNewChannel} />
                        </span>
                    </div>

                    <div className="workspace-container-messages">
                        <MessagesList messages={channelSelected.messages} channelName={channelSelected.name} />
                        <NewMessage
                            workspaceId={workspaceSelected.id}
                            channelId={channelSelected.id}
                            updateMessages={updateMessages}
                            channelName={channelSelected.name}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Workspace;
