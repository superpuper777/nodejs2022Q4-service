import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UUIDv4 } from 'uuid-v4-validator';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    if (
      createAlbumDto.hasOwnProperty('name') &&
      createAlbumDto.hasOwnProperty('year') &&
      createAlbumDto.hasOwnProperty('artistId')
    ) {
      const createdAlbum = this.albumRepository.create(createAlbumDto);
      const savedAlbum = await this.albumRepository.save(createdAlbum);
      return savedAlbum;
    } else throw new BadRequestException('Bad request. Try again');
  }

  findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const isValid = UUIDv4.validate(id);
    const album = await this.albumRepository.findOneBy({ id });

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

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });
    const { name, year, artistId } = updateAlbumDto;

    if (!UUIDv4.validate(id)) {
      throw new BadRequestException();
    }

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    if (name) {
      album.name = name;
    }
    if (year) {
      album.year = year;
    }
    if (artistId) {
      album.artistId = artistId;
    }

    const updatedAlbum = await this.albumRepository.save(album);
    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumRepository.findOneBy({ id });

    if (!UUIDv4.validate(id)) {
      throw new BadRequestException();
    }

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    // const idxFavoriteAlbum = this.db.favorites.albums.findIndex(
    //   (artistId) => artistId === id,
    // );

    // if (idxFavoriteAlbum !== -1) {
    //   this.db.favorites.albums.splice(idxFavoriteAlbum, 1);
    // }

    // this.db.tracks.forEach((track) => {
    //   if (track.albumId === id) {
    //     track.albumId = null;
    //   }
    // });

    await this.albumRepository.delete(id);
  }
}
