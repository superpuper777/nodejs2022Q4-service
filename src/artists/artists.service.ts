import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUIDv4 } from 'uuid-v4-validator';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '@/artists/entities/artist.entity';
// import { Album } from '@/albums/entities/album.entity';
// import { Track } from '@/tracks/entities/track.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const createdArtist = this.artistRepository.create(createArtistDto);
    if (
      createArtistDto.hasOwnProperty('name') &&
      createArtistDto.hasOwnProperty('grammy')
    ) {
      const savedArtist = await this.artistRepository.save(createdArtist);
      return savedArtist;
    } else throw new BadRequestException('Bad request. Try again');
  }

  findAll() {
    return this.artistRepository.find();
  }

  findOne(id: string) {
    const isValid = UUIDv4.validate(id);
    const artist = this.artistRepository.findOneBy({ id });
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

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });

    const { name, grammy } = updateArtistDto;
    if (!UUIDv4.validate(id)) {
      throw new BadRequestException();
    }

    if (!updateArtistDto.hasOwnProperty('name')) {
      throw new BadRequestException('Bad request. Try again');
    } else artist.name = name;
    if (!updateArtistDto.hasOwnProperty('grammy')) {
      throw new BadRequestException('Bad request. Try again');
    } else artist.grammy = grammy;

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = await this.artistRepository.save(artist);
    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!UUIDv4.validate(id)) {
      throw new BadRequestException();
    }

    if (!artist) {
      throw new NotFoundException();
    }

    // const idxFavoriteArtist = this.db.favorites.artists.findIndex(
    //   (artistId) => artistId === id,
    // );

    // if (idxFavoriteArtist !== -1) {
    //   this.db.favorites.artists.splice(idxFavoriteArtist, 1);
    // }

    // this.db.tracks.forEach((track) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    // });

    // this.db.albums.forEach((album) => {
    //   if (album.artistId === id) {
    //     album.artistId = null;
    //   }
    // });

    // Album.findOne({ include: [Artist] }).then((album) => {
    //   album.artistId.forEach((artist) => (artist = null));
    // });

    await this.artistRepository.delete(id);
  }
}
