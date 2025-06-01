import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.types';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): FavoritesResponse {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id') id: string): void {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      this.favoritesService.addTrack(id);
    } catch (error) {
      if (error.message === 'Track not found') {
        throw new HttpException(
          'Track not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string): void {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      this.favoritesService.removeTrack(id);
    } catch (error) {
      if (error.message === 'Track not found in favorites') {
        throw new HttpException(
          'Track not found in favorites',
          HttpStatus.NOT_FOUND,
        );
      }
      throw error;
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id') id: string): void {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      this.favoritesService.addAlbum(id);
    } catch (error) {
      if (error.message === 'Album not found') {
        throw new HttpException(
          'Album not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string): void {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      this.favoritesService.removeAlbum(id);
    } catch (error) {
      if (error.message === 'Album not found in favorites') {
        throw new HttpException(
          'Album not found in favorites',
          HttpStatus.NOT_FOUND,
        );
      }
      throw error;
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id') id: string): void {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      this.favoritesService.addArtist(id);
    } catch (error) {
      if (error.message === 'Artist not found') {
        throw new HttpException(
          'Artist not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string): void {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      this.favoritesService.removeArtist(id);
    } catch (error) {
      if (error.message === 'Artist not found in favorites') {
        throw new HttpException(
          'Artist not found in favorites',
          HttpStatus.NOT_FOUND,
        );
      }
      throw error;
    }
  }
} 