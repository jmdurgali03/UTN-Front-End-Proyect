import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './screens/main/MainPage';
import CreateWs from './components/workspaces/create/CreateWs';
import Workspace from './components/workspaces/Workspace';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />

        <Route path='workspace/new' element={<CreateWs />} />

        <Route path='/workspace/:workspace_id/:channel_id' element={<Workspace />} />

      </Routes>
    </>
  )
}

export default App;
