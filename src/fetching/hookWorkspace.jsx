import React, { useEffect, useState } from 'react';
import data from '../data/workspaces.json';

const hookWorkspace = () => {
    const [workspaces, setWorkspaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const loadWorkspaces = () => {
            const predefinedWorkspaces = data;

            const localWorkspaces = JSON.parse(localStorage.getItem('workspaces'));
            const savedWorkspaces = localWorkspaces || predefinedWorkspaces;

            setWorkspaces(savedWorkspaces);
            setIsLoading(false);
        };

        setTimeout(() => {
            loadWorkspaces();
        }, 50);
    }, []);

    return { workspaces, isLoading };
};

export default hookWorkspace;
