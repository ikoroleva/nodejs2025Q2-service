import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, AlbumResponse } from './album.types';
import { TrackService } from '../track/track.service';
import { AlbumRepository } from './album.repository';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly trackService: TrackService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumResponse> {
    return this.albumRepository.create(createAlbumDto);
  }

  async findAll(): Promise<AlbumResponse[]> {
    return this.albumRepository.findAll();
  }

  async findOne(id: string): Promise<AlbumResponse | null> {
    return this.albumRepository.findById(id);
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumResponse | null> {
    return this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: string): Promise<boolean> {
    // Update related tracks
    const tracks = await this.trackService.findAll();
    for (const track of tracks) {
      if (track.album.id === id) {
        await this.trackService.update(track.id, { ...track, album: null });
      }
    }

    return this.albumRepository.delete(id);
  }
}
