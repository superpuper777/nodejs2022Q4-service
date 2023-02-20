import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Track } from '../../tracks/entities/track.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean')
  grammy: boolean;

  @OneToMany((type) => Track, (track) => track.artistId)
  tracks: Track[];

  @OneToMany((type) => Album, (album) => album.artistId)
  albums: Album[];
}
