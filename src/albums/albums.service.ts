import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UUIDv4 } from 'uuid-v4-validator';
import { DatabaseService } from '@/database/database.service';
import { Album } from './entities/album.entity';
import { NewAlbum } from './utils/createAlbum';

@Injectable()
export class AlbumsService {
  constructor(private db: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    if (
      createAlbumDto.hasOwnProperty('name') &&
      createAlbumDto.hasOwnProperty('year') &&
      createAlbumDto.hasOwnProperty('artistId')
    ) {
      const newAlbum = new NewAlbum(createAlbumDto);
      this.db.albums.push(newAlbum);
      return newAlbum;
    } else throw new BadRequestException('Bad request. Try again');
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const isValid = UUIDv4.validate(id);
    const album: Album = this.db.albums.find((album) => album.id === id);

    if (!isValid) {
      throw new BadRequestException('Bad request. Try again');
    }

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    if (isValid && album) {
      return album;
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.db.albums.findIndex((artist) => artist.id === id);
    const { artistId, year, name } = updateAlbumDto;

    if (
      !UUIDv4.validate(id) ||
      (!updateAlbumDto.hasOwnProperty('name') &&
        !updateAlbumDto.hasOwnProperty('albumId') &&
        !updateAlbumDto.hasOwnProperty('artistId')) ||
      !artistId
    ) {
      throw new BadRequestException('Bad request. Try again');
    }
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    const album = this.db.albums[index];
    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    this.db.albums.splice(index, 1, updatedAlbum);
    return updatedAlbum;
  }

  remove(id: string) {
    const index = this.db.albums.findIndex((album) => album.id === id);

    if (!UUIDv4.validate(id)) {
      throw new BadRequestException();
    }

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    const idxFavoriteAlbum = this.db.favorites.albums.findIndex(
      (artistId) => artistId === id,
    );

    if (idxFavoriteAlbum !== -1) {
      this.db.favorites.albums.splice(idxFavoriteAlbum, 1);
    }

    this.db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.db.albums.splice(index, 1);
  }
}
