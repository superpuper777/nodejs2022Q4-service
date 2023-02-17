import { v4 as uuid } from 'uuid';

import { CreateTrackDto } from '../dto/create-track.dto';
import { Track } from '@/tracks/entities/track.entity';

export class NewTrack implements Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(track: CreateTrackDto) {
    this.id = uuid();
    this.name = track.name;
    this.artistId = track.artistId;
    this.albumId = track.albumId;
    this.duration = track.duration;
  }
}
