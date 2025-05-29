import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }
  @UseGuards(AuthGuard('jwt'))
  @Post("create")
  create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    const userId = req.user.id;  // здесь user.id из JwtStrategy.validate()
    return this.notesService.create(createNoteDto, userId);
  }


  @Get()
  getAll() {
    return this.notesService.findAll()
  }

  @Delete("")
  delete(@Body() id: string) {
    return this.notesService.delete(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.notesService.update(id, updateNoteDto);
  }
  @Get(":id")
  getOne(
    @Param('id') id: string
  ) {
    return this.notesService.find(id)
  }

}
