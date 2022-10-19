import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from 'src/utils/models/room.model';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room)
    private roomModel: typeof Room,
  ) {}

  async getAllRooms(): Promise<Room[]> {
    return await this.roomModel.findAll({});
  }

  async createNewRoom(id: string): Promise<Room> {
    return await this.roomModel.create({ id });
  }

  async deleteExistingRoom(id: string): Promise<number> {
    return await this.roomModel.destroy({ where: { id } });
  }
}
