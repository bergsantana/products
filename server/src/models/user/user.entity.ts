import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  EmailToLowerCase() {
    this.email = this.email.toLocaleLowerCase();
  }
}
