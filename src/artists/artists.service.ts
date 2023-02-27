import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UUIDv4 } from 'uuid-v4-validator';
import { DatabaseService } from '@/database/database.service';
import { NewArtist } from './utils/createArtist';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '@/artists/entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private db: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    if (
      createArtistDto.hasOwnProperty('name') &&
      createArtistDto.hasOwnProperty('grammy')
    ) {
      const newArtist = new NewArtist(createArtistDto);
      this.db.artists.push(newArtist);
      return newArtist;
    } else throw new BadRequestException('Bad request. Try again');
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const isValid = UUIDv4.validate(id);
    const artist: Artist = this.db.artists.find((artist) => artist.id === id);

    if (!isValid) {
      throw new BadRequestException('Bad request. Try again');
    }

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    if (isValid && artist) {
      return artist;
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    if (!UUIDv4.validate(id)) {
      throw new BadRequestException();
    }

    // if (!updateArtistDto.hasOwnProperty('name')) {
    //   throw new BadRequestException('Bad request. Try again');
    // }
    // if (!updateArtistDto.hasOwnProperty('grammy')) {
    //   throw new BadRequestException('Bad request. Try again');
    // }

    if (index !== -1) {
      this.db.artists[index] = { id, ...updateArtistDto };
    }
    const artist = this.db.artists[index];
    const updatedArtist = new NewArtist({
      ...artist,
      ...updateArtistDto,
    });
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }
    this.db.artists.splice(index, 1, updatedArtist);

    return updatedArtist;
  }

  remove(id: string) {
    const index = this.db.artists.findIndex((artist) => artist.id === id);

    if (!UUIDv4.validate(id)) {
      throw new BadRequestException();
    }

    if (index === -1) {
      throw new NotFoundException();
    }

    const idxFavoriteArtist = this.db.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (idxFavoriteArtist !== -1) {
      this.db.favorites.artists.splice(idxFavoriteArtist, 1);
    }

    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.db.artists.splice(index, 1);
  }
}
