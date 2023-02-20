import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UUIDv4 } from 'uuid-v4-validator';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    if (
      createTrackDto.hasOwnProperty('name') &&
      createTrackDto.hasOwnProperty('albumId') &&
      createTrackDto.hasOwnProperty('artistId') &&
      createTrackDto.hasOwnProperty('duration')
    ) {
      const createdTrack = this.trackRepository.create(createTrackDto);
      const savedTrack = await this.trackRepository.save(createdTrack);
      return savedTrack;
    } else throw new BadRequestException();
  }

  findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const isValid = UUIDv4.validate(id);
    const track = await this.trackRepository.findOneBy({ id });

    if (!isValid) {
      throw new BadRequestException('Bad request. Try again');
    }

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    if (isValid && track) {
      return track;
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    const { name, duration, artistId, albumId } = updateTrackDto;

    if (!UUIDv4.validate(id)) {
      throw new BadRequestException('Bad request. Try again');
    }

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    if (name) {
      track.name = name;
    }
    if (duration !== undefined) {
      track.duration = duration;
    }
    if (artistId !== undefined) {
      track.artistId = artistId;
    }
    if (albumId !== undefined) {
      track.albumId = albumId;
    }

    const updatedTrack = await this.trackRepository.save(track);
    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!UUIDv4.validate(id)) {
      throw new BadRequestException('Bad request. Try again');
    }

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    // const idxFavoriteTrack = this.db.favorites.artists.findIndex(
    //   (trackId) => trackId === id,
    // );

    // if (idxFavoriteTrack !== -1) {
    //   this.db.favorites.tracks.splice(idxFavoriteTrack, 1);
    // }

    await this.trackRepository.delete(id);
  }
}
