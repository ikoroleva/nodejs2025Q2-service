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
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto, TrackResponse } from './track.types';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<TrackResponse[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TrackResponse> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackResponse> {
    if (!createTrackDto.name || typeof createTrackDto.duration !== 'number') {
      throw new HttpException(
        'Bad request. Body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackResponse> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      typeof updateTrackDto.name !== 'string' ||
      typeof updateTrackDto.duration !== 'number'
    ) {
      throw new HttpException(
        'Bad request. Body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = await this.trackService.update(id, updateTrackDto);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isRemoved = await this.trackService.remove(id);
    if (!isRemoved) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
