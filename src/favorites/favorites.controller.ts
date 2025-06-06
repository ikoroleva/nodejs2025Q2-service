import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
  Req,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse, CustomRequest } from './favorites.types';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(@Req() req: CustomRequest): Promise<FavoritesResponse> {
    return this.favoritesService.findAll(req.user);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<void> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.favoritesService.addTrack(req.user, id);
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
  async removeTrack(
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<void> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.favoritesService.removeTrack(req.user, id);
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
  async addAlbum(
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<void> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.favoritesService.addAlbum(req.user, id);
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
  async removeAlbum(
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<void> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.favoritesService.removeAlbum(req.user, id);
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
  async addArtist(
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<void> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.favoritesService.addArtist(req.user, id);
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
  async removeArtist(
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<void> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.favoritesService.removeArtist(req.user, id);
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
