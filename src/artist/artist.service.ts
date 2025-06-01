import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  Artist,
  CreateArtistDto,
  UpdateArtistDto,
  ArtistResponse,
} from './artist.types';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto): ArtistResponse {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  findAll(): ArtistResponse[] {
    return this.artists;
  }

  findOne(id: string): ArtistResponse | null {
    return this.artists.find((artist) => artist.id === id) || null;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistResponse | null {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return null;

    this.artists[artistIndex] = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };

    return this.artists[artistIndex];
  }

  remove(id: string): boolean {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return false;

    // Update related tracks
    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        this.trackService.update(track.id, { ...track, artistId: null });
      }
    });

    // Update related albums
    const albums = this.albumService.findAll();
    albums.forEach((album) => {
      if (album.artistId === id) {
        this.albumService.update(album.id, { ...album, artistId: null });
      }
    });

    this.artists.splice(artistIndex, 1);
    return true;
  }
}
