import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: null })
  artistId: string | null;

  @Column({ default: null })
  albumId: string | null;

  @Column()
  duration: number;
}
