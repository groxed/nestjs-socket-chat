import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../elements/Loader/Loader';
import {
  createNewRoom,
  deleteExistingRoom,
  getAvailableChatRooms,
} from '../../utils/api';
import { Room } from '../../utils/types/room';
import './RoomSelect.sass';
import { nanoid } from 'nanoid';

type componentProps = {
  usernameState: any;
};

const RoomSelect = ({ usernameState }: componentProps) => {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = usernameState;
  const [inputError, setInputError] = useState('');

  const navigate = useNavigate();

  const handleUsernameInput = (ev: any): void => {
    setUsername(ev.target.value);
  };

  const redirectToRoom = (roomId: string | number): void => {
    if (!!!username.length) {
      return setInputError('Username cannot be empty');
    }
    localStorage.setItem('currentUsername', JSON.stringify(username));
    navigate(`/room/${roomId}`);
  };

  const getChatRooms = async () => {
    await getAvailableChatRooms()
      .then((res) => {
        setIsLoading(false);
        setAvailableRooms(res.data);
      })
      .catch((e) => console.error(e));
  };
  const createRoom = async () => {
    const newRoom = { id: `${nanoid(5)}` };

    await createNewRoom(newRoom)
      .then(() => {
        getChatRooms();
      })
      .catch((e) => console.error(e));
  };
  const deleteRoom = async (e: any, id: string) => {
    e.stopPropagation();

    await deleteExistingRoom(id)
      .then(() => {
        getChatRooms();
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  return (
    <div className="RoomSelect__Rooms">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="RoomSelect__Rooms__usernameInput">
            <p>Username: </p>
            <input
              type="text"
              onChange={handleUsernameInput}
              value={username}
            ></input>
          </div>
          {!!inputError.length && (
            <span className="RoomSelect__Error">{inputError}</span>
          )}

          {!!availableRooms.length ? (
            availableRooms.map((room) => (
              <div
                className="RoomSelect__Rooms-item"
                key={room.id}
                onClick={() => redirectToRoom(room.id)}
              >
                Room {room.id}
                <span
                  className="RoomSelect__Rooms-item__delete"
                  onClick={(e) => deleteRoom(e, room.id)}
                >
                  X
                </span>
              </div>
            ))
          ) : (
            <div className="RoomSelect__Rooms--noRooms">No rooms yet</div>
          )}
          <div className="RoomSelect__Rooms-item NewRoom" onClick={createRoom}>
            + New room
          </div>
        </>
      )}
    </div>
  );
};

export default RoomSelect;
