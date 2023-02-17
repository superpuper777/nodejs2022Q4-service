import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { DatabaseService } from '@/database/database.service';
import { NewFavoriteItem } from './utils/createFavorite';

@Injectable()
export class FavoritesService {
  constructor(private db: DatabaseService) {}

  findAll() {
    const tracks = this.db.tracks.filter((track) =>
      this.db.favorites.tracks.includes(track.id),
    );
    const albums = this.db.albums.filter((album) =>
      this.db.favorites.albums.includes(album.id),
    );
    const artists = this.db.artists.filter((artist) =>
      this.db.favorites.artists.includes(artist.id),
    );

    const favoriteItem = new NewFavoriteItem({
      artists,
      albums,
      tracks,
    });

    return favoriteItem;
  }

  addTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    this.db.favorites.tracks.push(id);
  }

  removeTrack(id: string) {
    const index = this.db.favorites.tracks.findIndex((track) => track === id);

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.db.favorites.tracks.splice(index, 1);
  }

  addAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    this.db.favorites.albums.push(id);
  }

  removeAlbum(id: string) {
    const index = this.db.favorites.albums.findIndex((album) => album === id);

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.db.favorites.albums.splice(index, 1);
  }

  addArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    this.db.favorites.artists.push(id);
  }

  removeArtist(id: string): void {
    const index = this.db.favorites.artists.findIndex(
      (artist) => artist === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.db.favorites.artists.splice(index, 1);
  }
}
