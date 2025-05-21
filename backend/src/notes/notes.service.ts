import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>
  ) {}
  create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create({
      id: uuidv4(),
      title: createNoteDto.title,
      content: createNoteDto.content,
      create_at: new Date(),
      updated_at: new Date(),
    })
    return this.noteRepository.save(note, {reload: true})
  }
  async delete (id: string): Promise<void>{
    await this.noteRepository.delete(id)
  }

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  find(id: string): Promise<Note[]> {
    return this.noteRepository.find({where: {id: id}})
  }
  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) throw new Error('Note not found');
    Object.assign(note, updateNoteDto, { updated_at: new Date() });
    return this.noteRepository.save(note);
  }

}
