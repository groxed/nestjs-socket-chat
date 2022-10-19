import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat/Chat';
import ChatSocket from '../sockets/ChatSocket';
import { Message } from '../utils/types/message';
import { User } from '../utils/types/user';

type componentProps = {
  username: string;
};

const ChatPage = ({ username }: componentProps) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [usersInRoom, setUsersInRoom] = useState<User[]>([]);
  const { id } = useParams();

  return (
    <>
      <ChatSocket
        roomId={id || ''}
        username={username}
        setChatMessages={setChatMessages}
        setUsersInRoom={setUsersInRoom}
      />
      <Chat
        username={username}
        chatMessages={chatMessages}
        usersInRoom={usersInRoom}
      />
    </>
  );
};

export default ChatPage;
