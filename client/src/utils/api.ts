import axios from 'axios';
import { Room } from './types/room';

export const SERVER_URL = 'http://localhost:4000';
const BASE_ENDPOINT = '/rooms';

export const getAvailableChatRooms = () =>
  axios.get(`${SERVER_URL + BASE_ENDPOINT}`);

export const createNewRoom = (room: Room) =>
  axios.post(`${SERVER_URL + BASE_ENDPOINT}`, room);

export const deleteExistingRoom = (id: string) =>
  axios.delete(`${SERVER_URL + BASE_ENDPOINT}/${id}`);
