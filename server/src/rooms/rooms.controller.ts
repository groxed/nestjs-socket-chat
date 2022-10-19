import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/createRoom.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  getAllRooms() {
    return this.roomsService.getAllRooms();
  }

  @Post()
  createNewRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createNewRoom(createRoomDto.id);
  }

  @Delete(':id')
  deleteExistingRoom(@Param('id') id: string) {
    return this.roomsService.deleteExistingRoom(id);
  }
}
