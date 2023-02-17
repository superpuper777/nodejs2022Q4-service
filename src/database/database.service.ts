import { Injectable } from '@nestjs/common';
import { User } from '@/users/entities/user.entity';
import { Artist } from '@/artists/entities/artist.entity';
import { Album } from '@/albums/entities/album.entity';
import { Track } from '@/tracks/entities/track.entity';
import { Favorite } from '@/favorites/entities/favorite.entity';

@Injectable()
export class DatabaseService {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: Favorite;

  constructor() {
    this.users = [
      {
        id: 'fab0d07b-0c09-49ca-8fa1-894373a192ed',
        login: 'safasf',
        password: 'ftuguoijnik',
        version: 1,
        createdAt: 1675498252,
        updatedAt: 1675498252,
      },
      {
        id: '80d01a6f-9983-4d98-8fff-2f81e645008f',
        login: 'ololo',
        password: '14sdgdsg67',
        version: 4,
        createdAt: 1675329274,
        updatedAt: 1675498252,
      },
      {
        id: 'f18b0fc1-ccb7-4930-bf11-25f3757869c8',
        login: 'alex423',
        password: 'qwerty',
        version: 5,
        createdAt: 1675498233,
        updatedAt: 1675498121,
      },
    ];
    this.artists = [
      {
        id: '29c38157-9a0a-4707-9fd1-39bc11aa9af9',
        name: 'Robert Falcon',
        grammy: false,
      },
      {
        id: '655d88e3-3d2f-4b0f-a1fe-85d6f114c063',
        name: 'Led by Lanterns',
        grammy: false,
      },
      {
        id: '42e9ce56-f0f0-46aa-90ff-d2b776bef3ca',
        name: 'Circa Waves',
        grammy: false,
      },
    ];
    this.albums = [
      {
        id: 'ad5a856e-e5bb-46b0-b73e-a97e6b13a3eb',
        name: 'All of the lights',
        year: 2022,
        artistId: '29c38157-9a0a-4707-9fd1-39bc11aa9af9',
      },
      {
        id: 'faef9e6b-a1d4-4ccd-8d64-134ac7f2f36d',
        name: 'Paralysis',
        year: 2022,
        artistId: '655d88e3-3d2f-4b0f-a1fe-85d6f114c063',
      },
      {
        id: 'ccc4d2ba-d005-4f98-88a0-38054170d064',
        name: 'Do you wanna talk',
        year: 2022,
        artistId: '42e9ce56-f0f0-46aa-90ff-d2b776bef3ca',
      },
    ];
    this.tracks = [
      {
        id: 'dc7761c9-6c75-4fc5-a5c9-91a31d78ee04',
        name: 'All of the lights',
        artistId: '29c38157-9a0a-4707-9fd1-39bc11aa9af9',
        albumId: 'ad5a856e-e5bb-46b0-b73e-a97e6b13a3eb',
        duration: 2,
      },
      {
        id: 'b719a6a1-96ed-4f20-9e0d-1b1bedd78ef8',
        name: 'Criminal',
        artistId: '655d88e3-3d2f-4b0f-a1fe-85d6f114c063',
        albumId: 'faef9e6b-a1d4-4ccd-8d64-134ac7f2f36d',
        duration: 4,
      },
      {
        id: 'c04e8a44-5d28-47e5-a355-f40c2189b3f4',
        name: 'Do you wanna talk',
        artistId: '42e9ce56-f0f0-46aa-90ff-d2b776bef3ca',
        albumId: 'ccc4d2ba-d005-4f98-88a0-38054170d064',
        duration: 20,
      },
    ];
    this.favorites = {
      artists: ['29c38157-9a0a-4707-9fd1-39bc11aa9af9'],
      albums: [],
      tracks: ['c04e8a44-5d28-47e5-a355-f40c2189b3f4'],
    };
  }
}
