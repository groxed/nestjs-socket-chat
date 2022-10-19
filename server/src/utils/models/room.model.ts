import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Message } from './message.model';

@Table({ timestamps: false })
export class Room extends Model {
  @PrimaryKey
  @Column
  id: string;

  @HasMany(() => Message)
  messages: Message[];
}
