import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, TrackResponse } from './track.types';
import { TrackRepository } from './track.repository';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackResponse> {
    return this.trackRepository.createWithResponse(createTrackDto);
  }

  async findAll(): Promise<TrackResponse[]> {
    return this.trackRepository.findAllWithResponse();
  }

  async findOne(id: string): Promise<TrackResponse | null> {
    return this.trackRepository.findOneWithResponse(id);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackResponse | null> {
    return this.trackRepository.updateWithResponse(id, updateTrackDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.trackRepository.delete(id);
  }
}
