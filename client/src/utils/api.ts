import axios from 'axios';
import { Room } from './types/room';

export const SERVER_URL = 'http://localhost:4000';

export const getAvailableChatRooms = () => axios.get(`${SERVER_URL}/rooms`);
export const createNewRoom = (room: Room) =>
  axios.post(`${SERVER_URL}/rooms`, room);
export const deleteExistingRoom = (id: string) =>
  axios.delete(`${SERVER_URL}/rooms/${id}`);
