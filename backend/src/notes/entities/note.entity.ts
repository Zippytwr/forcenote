import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
