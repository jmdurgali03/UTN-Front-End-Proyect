export const validateChannel = (channelName, savedWorkspaces) => {

    if (channelName.length < 3 || channelName.length > 20) {
        return 'Channel name must be between 3 and 20 characters';
    }

    if (channelName.trim() === '') {
        return 'Channel name cannot be empty';
    }   

    const channelExists = savedWorkspaces.some((workspace) => 
        workspace.channels.some((channel) => channel.name === channelName));
    
    if (channelExists) {
        return 'Channel name already exists';
    }

    return null;
}