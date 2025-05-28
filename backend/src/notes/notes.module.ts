import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
     TypeOrmModule.forFeature([Note]),
     AuthModule
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
