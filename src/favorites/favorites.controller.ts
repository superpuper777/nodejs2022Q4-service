import {
  Controller,
  Get,
  Post,
  Delete,
  Header,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Header('content-type', 'application/json')
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @Header('content-type', 'application/json')
  addTrack(id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @Header('content-type', 'application/json')
  @HttpCode(204)
  removeTrack(id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @Header('content-type', 'application/json')
  addAlbum(id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @Header('content-type', 'application/json')
  @HttpCode(204)
  removeAlbum(id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @Header('content-type', 'application/json')
  addArtist(id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @Header('content-type', 'application/json')
  @HttpCode(204)
  removeArtist(id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
