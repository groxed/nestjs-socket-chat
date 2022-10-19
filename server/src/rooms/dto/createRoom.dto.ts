import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  id: string;
}
