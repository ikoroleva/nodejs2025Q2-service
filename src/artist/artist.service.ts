import { Injectable } from '@nestjs/common';
import {
  CreateArtistDto,
  UpdateArtistDto,
  ArtistResponse,
} from './artist.types';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistRepository } from './artist.repository';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistResponse> {
    return this.artistRepository.create(createArtistDto);
  }

  async findAll(): Promise<ArtistResponse[]> {
    return this.artistRepository.findAll();
  }

  async findOne(id: string): Promise<ArtistResponse | null> {
    return this.artistRepository.findById(id);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistResponse | null> {
    return this.artistRepository.update(id, updateArtistDto);
  }

  async remove(id: string): Promise<boolean> {
    // Update related tracks
    const tracks = await this.trackService.findAll();
    for (const track of tracks) {
      if (track.artist.id === id) {
        await this.trackService.update(track.id, { ...track, artist: null });
      }
    }

    // Update related albums
    const albums = await this.albumService.findAll();
    for (const album of albums) {
      if (album.artist.id === id) {
        await this.albumService.update(album.id, { ...album, artist: null });
      }
    }

    return this.artistRepository.delete(id);
  }
}
