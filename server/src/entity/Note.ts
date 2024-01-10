import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  title: string;

  @Column("text")
  note: string;

  @Column("text", { nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
}
