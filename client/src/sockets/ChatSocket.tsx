import { useEffect } from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from '../utils/api';
import { Message } from '../utils/types/message';
import { User } from '../utils/types/user';

const SendMessage = 'SendMessage';
const ReceiveMessage = 'ReceiveMessage';
const GetPrevMessages = `GetPrevMessages`;
const UsersInRoom = 'UsersInRoom';

let socket: any;

export const sendMessage = (message: Message) => {
  socket.emit(SendMessage, message);
};

type componentProps = {
  roomId: string;
  username: string;
  setChatMessages: Function;
  setUsersInRoom: Function;
};

const ChatSocket: React.FC<componentProps> = ({
  roomId,
  username,
  setChatMessages,
  setUsersInRoom,
}: componentProps) => {
  useEffect(() => {
    socket = io(SERVER_URL, { query: { roomId, username } });

    socket.on(ReceiveMessage, (data: Message) => {
      setChatMessages((messages: Message[]) => [...messages, data]);
    });
    socket.on(GetPrevMessages, (data: Message[]) => {
      setChatMessages(data);
    });
    socket.on(UsersInRoom, (data: User[]) => {
      setUsersInRoom(data);
    });

    return () => {
      socket.disconnect();
    };
    //eslint-disable-next-line
  }, [username]);

  return <></>;
};

export default ChatSocket;
