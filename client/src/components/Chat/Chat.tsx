import { useState } from 'react';
import { sendMessage } from '../../sockets/ChatSocket';
import { Message } from '../../utils/types/message';
import { User } from '../../utils/types/user';
import './Chat.sass';
import Messages from './Messages/Messages';

type componentProps = {
  username: string;
  chatMessages: Message[];
  usersInRoom: User[];
};

const Chat = ({ username, chatMessages, usersInRoom }: componentProps) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const messageInputHandler = (e: any): void => {
    setCurrentMessage(e.target.value);
  };

  const messageKeyDownHandler = (e: any): void => {
    if (e.key === 'Enter' && !!currentMessage.length) {
      e.preventDefault();
      sendMessage({ senderName: username, content: currentMessage });
      setCurrentMessage('');
    }
  };

  return (
    <div className="Chat">
      <div className={`Chat__UsersInRoom ${isOpen ? 'open' : ''}`}>
        <div
          className="Chat__UsersInRoom-showMore"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>Users in this room</p>
        </div>
        <div className="Chat__UsersInRoom__users">
          {usersInRoom.map((user) => (
            <div className="Chat__UsersInRoom__users-item" key={user.id}>
              {`${user.username} (id: ${user.id})`}
            </div>
          ))}
        </div>
      </div>
      <Messages messages={chatMessages} />
      <div className="Chat__UserInputs">
        <div className="Chat__UserInputs__username">{`[${username}]:`}</div>
        <input
          className="Chat__UserInputs__messageInput"
          type="text"
          onChange={messageInputHandler}
          onKeyDown={messageKeyDownHandler}
          value={currentMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
