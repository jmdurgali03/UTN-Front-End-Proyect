export const validateWorkspace = (workspaceName, savedWorkspaces) => {
 
    if (workspaceName.length < 3 || workspaceName.length > 20) {
        return 'Workspace name must be between 3 and 20 characters';
    }

    if (workspaceName.trim() === '') {
        return 'Workspace name cannot be empty';
    }

    const workspaceExists = savedWorkspaces.some((workspace) => workspace.name === workspaceName);
    if (workspaceExists) {
        return 'Workspace name already exists';
    }

    return null;
}