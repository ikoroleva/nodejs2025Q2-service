import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, TrackResponse } from './track.types';
import { TrackRepository } from './track.repository';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackResponse> {
    return this.trackRepository.create(createTrackDto);
  }

  async findAll(): Promise<TrackResponse[]> {
    return this.trackRepository.findAll();
  }

  async findOne(id: string): Promise<TrackResponse | null> {
    return this.trackRepository.findById(id);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackResponse | null> {
    return this.trackRepository.update(id, updateTrackDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.trackRepository.delete(id);
  }
}
