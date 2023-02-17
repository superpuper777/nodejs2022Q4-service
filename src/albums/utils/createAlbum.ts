import { v4 as uuid } from 'uuid';

import { Album } from '@/albums/entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class NewAlbum implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(album: CreateAlbumDto) {
    this.id = uuid();
    this.name = album.name;
    this.year = album.year;
    this.artistId = album.artistId;
  }
}
