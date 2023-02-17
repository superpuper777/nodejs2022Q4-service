import { Artist } from '@/artists/entities/artist.entity';
import { Album } from '@/albums/entities/album.entity';
import { Track } from '@/tracks/entities/track.entity';

export class FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
