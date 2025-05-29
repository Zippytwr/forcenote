import { ConfigService } from "@nestjs/config";
import { genSalt, hash } from "bcrypt";
import { Note } from "src/notes/entities/note.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({
        unique: true
    })
    username: string
    @Column()
    password: string
    @OneToMany(() => Note, note => note.user)
    notes: Note[];
    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPasswords (configService: ConfigService) {
        const salt = await genSalt()
        this.password = await hash(this.password + String(process.env.PEPPER), salt)
    }
}
