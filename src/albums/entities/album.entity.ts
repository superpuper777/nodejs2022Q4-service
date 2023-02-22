import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ default: null })
  artistId: string | null;
}
