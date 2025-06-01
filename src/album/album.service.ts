import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  Album,
  CreateAlbumDto,
  UpdateAlbumDto,
  AlbumResponse,
} from './album.types';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(private readonly trackService: TrackService) {}

  create(createAlbumDto: CreateAlbumDto): AlbumResponse {
    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): AlbumResponse[] {
    return this.albums;
  }

  findOne(id: string): AlbumResponse | null {
    return this.albums.find((album) => album.id === id) || null;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumResponse | null {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) return null;

    this.albums[albumIndex] = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };

    return this.albums[albumIndex];
  }

  remove(id: string): boolean {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) return false;

    // Update related tracks
    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        this.trackService.update(track.id, { ...track, albumId: null });
      }
    });

    this.albums.splice(albumIndex, 1);
    return true;
  }
}
