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
import { ArtistService } from './artist.service';
import {
  CreateArtistDto,
  UpdateArtistDto,
  ArtistResponse,
} from './artist.types';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<ArtistResponse[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ArtistResponse> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistResponse> {
    if (!createArtistDto.name || createArtistDto.grammy === undefined) {
      throw new HttpException(
        'Bad request. Body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistResponse> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      typeof updateArtistDto.name !== 'string' ||
      typeof updateArtistDto.grammy !== 'boolean'
    ) {
      throw new HttpException(
        'Bad request. Body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.artistService.update(id, updateArtistDto);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isRemoved = await this.artistService.remove(id);
    if (!isRemoved) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
