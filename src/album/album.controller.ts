import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto, AlbumResponse } from './album.types';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): AlbumResponse[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): AlbumResponse {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = this.albumService.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto): AlbumResponse {
    if (!createAlbumDto.name || typeof createAlbumDto.year !== 'number') {
      throw new HttpException(
        'Bad request. Body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): AlbumResponse {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      typeof updateAlbumDto.name !== 'string' ||
      typeof updateAlbumDto.year !== 'number'
    ) {
      throw new HttpException(
        'Bad request. Body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = this.albumService.update(id, updateAlbumDto);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isRemoved = this.albumService.remove(id);
    if (!isRemoved) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
