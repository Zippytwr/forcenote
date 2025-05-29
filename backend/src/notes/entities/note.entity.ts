import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    title: string
    @Column('text')
    content: string
    @Column({ type: 'timestamp' })
    create_at: Date
    @Column({ type: 'timestamp' })
    updated_at: Date
    @Column({ name: 'user_id' }) // Указываем имя в базе
    user_id: string;             // Но в коде — camelCase

    @ManyToOne(() => User, user => user.notes)
    @JoinColumn({ name: 'user_id' })
    user: User;

}
