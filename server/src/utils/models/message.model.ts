import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Room } from './room.model';

@Table
export class Message extends Model {
  @Column
  senderName: string;

  @Column
  content: string;

  @BelongsTo(() => Room)
  room: Room;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  roomId: string;
}
