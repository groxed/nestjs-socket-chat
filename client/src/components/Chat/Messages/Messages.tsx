import { useEffect, useRef } from 'react';
import { Message } from '../../../utils/types/message';
import './Messages.sass';

type componentProps = {
  messages: Message[];
};

const Messages = ({ messages }: componentProps) => {
  const chatMessagesRef = useRef<any>(null);

  useEffect(() => {
    if (chatMessagesRef.current)
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages.length]);

  return (
    <div className="Chat__Messages" ref={chatMessagesRef}>
      {messages.map(({ senderName, content, createdAt }, idx: number) => (
        <div className="Chat__Messages-item" key={idx}>
          {`${senderName}: ${content} `}
          {createdAt && (
            <span className="Chat__Messages-item__time">
              {new Date(createdAt).toLocaleTimeString('it-IT')}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
