import { Artist } from '@/artists/entities/artist.entity';
import { Album } from '@/albums/entities/album.entity';
import { Track } from '@/tracks/entities/track.entity';

interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class NewFavoriteItem {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor({ artists, albums, tracks }: IFavoritesResponse) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
