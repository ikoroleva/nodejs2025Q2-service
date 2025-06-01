import { Injectable } from '@nestjs/common';
import { Favorites, FavoritesResponse } from './favorites.types';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  findAll(): FavoritesResponse {
    const artists = this.favorites.artists
      .map(id => this.artistService.findOne(id))
      .filter((artist): artist is NonNullable<typeof artist> => artist !== null);

    const albums = this.favorites.albums
      .map(id => this.albumService.findOne(id))
      .filter((album): album is NonNullable<typeof album> => album !== null);

    const tracks = this.favorites.tracks
      .map(id => this.trackService.findOne(id))
      .filter((track): track is NonNullable<typeof track> => track !== null);

    return { artists, albums, tracks };
  }

  addTrack(id: string): void {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new Error('Track not found');
    }
    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
  }

  removeTrack(id: string): void {
    const index = this.favorites.tracks.indexOf(id);
    if (index === -1) {
      throw new Error('Track not found in favorites');
    }
    this.favorites.tracks.splice(index, 1);
  }

  addAlbum(id: string): void {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new Error('Album not found');
    }
    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
  }

  removeAlbum(id: string): void {
    const index = this.favorites.albums.indexOf(id);
    if (index === -1) {
      throw new Error('Album not found in favorites');
    }
    this.favorites.albums.splice(index, 1);
  }

  addArtist(id: string): void {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new Error('Artist not found');
    }
    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
  }

  removeArtist(id: string): void {
    const index = this.favorites.artists.indexOf(id);
    if (index === -1) {
      throw new Error('Artist not found in favorites');
    }
    this.favorites.artists.splice(index, 1);
  }
} 