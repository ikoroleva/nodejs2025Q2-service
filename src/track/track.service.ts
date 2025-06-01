import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track, CreateTrackDto, UpdateTrackDto, TrackResponse } from './track.types';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto): TrackResponse {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      duration: createTrackDto.duration,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): TrackResponse[] {
    return this.tracks;
  }

  findOne(id: string): TrackResponse | null {
    return this.tracks.find((track) => track.id === id) || null;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackResponse | null {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return null;

    this.tracks[trackIndex] = {
      ...this.tracks[trackIndex],
      ...updateTrackDto,
    };

    return this.tracks[trackIndex];
  }

  remove(id: string): boolean {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return false;

    this.tracks.splice(trackIndex, 1);
    return true;
  }
} 