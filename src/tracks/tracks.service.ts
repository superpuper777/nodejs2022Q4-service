import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UUIDv4 } from 'uuid-v4-validator';
import { DatabaseService } from '@/database/database.service';
import { NewTrack } from './utils/createTrack';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private db: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    if (
      createTrackDto.hasOwnProperty('name') &&
      createTrackDto.hasOwnProperty('albumId') &&
      createTrackDto.hasOwnProperty('artistId') &&
      createTrackDto.hasOwnProperty('duration')
    ) {
      const newTrack = new NewTrack(createTrackDto);
      this.db.tracks.push(newTrack);
      return newTrack;
    } else throw new BadRequestException();
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const isValid = UUIDv4.validate(id);
    const track: Track = this.db.tracks.find((track) => track.id === id);

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

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.db.tracks.findIndex((track) => track.id === id);
    const { name } = updateTrackDto;
    if (
      !UUIDv4.validate(id) ||
      (!updateTrackDto.hasOwnProperty('name') &&
        !updateTrackDto.hasOwnProperty('albumId') &&
        !updateTrackDto.hasOwnProperty('artistId') &&
        !updateTrackDto.hasOwnProperty('duration')) ||
      !name
    ) {
      throw new BadRequestException('Bad request. Try again');
    }

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    if (index !== -1) {
      this.db.tracks[index] = { id, ...updateTrackDto };
    }

    const updatedTrack = Object.assign(this.db.tracks[index], {
      ...updateTrackDto,
    });

    this.db.tracks[index] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const index = this.db.tracks.findIndex((track) => track.id === id);

    if (!UUIDv4.validate(id)) {
      throw new BadRequestException('Bad request. Try again');
    }

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    const idxFavoriteTrack = this.db.favorites.artists.findIndex(
      (trackId) => trackId === id,
    );

    if (idxFavoriteTrack !== -1) {
      this.db.favorites.tracks.splice(idxFavoriteTrack, 1);
    }

    this.db.tracks.splice(index, 1);
  }
}
