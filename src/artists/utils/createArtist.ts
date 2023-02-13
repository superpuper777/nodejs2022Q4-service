import { v4 as uuid } from 'uuid';

import { Artist } from '@/artists/entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class NewArtist implements Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(artist: CreateArtistDto) {
    this.id = uuid();
    this.name = artist.name;
    this.grammy = artist.grammy;
  }
}
