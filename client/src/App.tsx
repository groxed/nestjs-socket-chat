import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import NoPage from './pages/NoPage';
import RoomSelectPage from './pages/RoomSelectPage';

const App = () => {
  const usernameState = useState('Guest');

  useEffect(() => {
    const [, setUsername] = usernameState;
    const currentUsername = localStorage.getItem('currentUsername');

    if (!!currentUsername) setUsername(JSON.parse(currentUsername));
    //eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/rooms" />} />
        <Route
          path="/rooms"
          element={<RoomSelectPage usernameState={usernameState} />}
        />
        <Route
          path="/room/:id"
          element={<ChatPage username={usernameState[0]} />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
