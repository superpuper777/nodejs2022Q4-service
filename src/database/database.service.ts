import { Injectable } from '@nestjs/common';
import { Favorite } from '@/favorites/entities/favorite.entity';

@Injectable()
export class DatabaseService {
  favorites: Favorite;

  constructor() {
    this.favorites = {
      artists: ['29c38157-9a0a-4707-9fd1-39bc11aa9af9'],
      albums: [],
      tracks: ['c04e8a44-5d28-47e5-a355-f40c2189b3f4'],
    };
  }
}
