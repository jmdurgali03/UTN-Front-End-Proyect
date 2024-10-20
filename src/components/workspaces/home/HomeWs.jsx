import React from 'react';
import { Link } from 'react-router-dom';
import WorkspaceItem from '../item/WorkspaceItem';
import hookWorkspace from '../../../fetching/hookWorkspace';
import './HomeWs.css';

const HomeWs = () => {

    const { workspaces, isLoading } = hookWorkspace();

    return (
        <>

            <div className='home-ws-main'>

                <h1 className='title-hero'>Welcome to App Messaging</h1>
                <span className='span-hero'>Enjoy efficient communication!</span>

                <div className='workspaces-main-list'>
                    <span className='workspaces-main-list-title'>Workspaces for @you</span>
                    {
                        isLoading
                            ? <span className='span-loading'>Loading...</span>
                            :
                            <div>
                                {
                                    workspaces.map((workspace) => {
                                        const firstChannelId = workspace.channels.length > 0
                                            ? workspace.channels[0].id
                                            : null
                                        return (
                                            <div className='workspace-item' key={workspace.id}>
                                                <WorkspaceItem
                                                    img={workspace.img}
                                                    name={workspace.name}
                                                    workspace_id={workspace.id}
                                                />
                                                <Link to={`/workspace/${workspace.id}/${firstChannelId}`}>
                                                    <button>Open</button>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }

                                <div className='create-workspace-container'>
                                    <span>Want to use App Messaging with another team?</span>
                                    <Link to={'/workspace/new'}>
                                        <button>Create Workspace</button>
                                    </Link>
                                </div>

                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default HomeWs