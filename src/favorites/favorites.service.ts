import { Injectable } from '@nestjs/common';
import { Favorites, FavoritesResponse } from './favorites.types';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.findFavorites();
    if (!favorites) {
      return { artists: [], albums: [], tracks: [] };
    }

    const artists = await Promise.all(
      (favorites.artists || []).map((id) => this.artistService.findOne(id)),
    );
    const albums = await Promise.all(
      (favorites.albums || []).map((id) => this.albumService.findOne(id)),
    );
    const tracks = await Promise.all(
      (favorites.tracks || []).map((id) => this.trackService.findOne(id)),
    );

    return {
      artists: artists
        .filter(
          (artist): artist is NonNullable<typeof artist> => artist !== null,
        )
        .map((artist) => ({
          id: artist.id,
          name: artist.name,
          grammy: artist.grammy,
        })),
      albums: albums
        .filter((album): album is NonNullable<typeof album> => album !== null)
        .map((album) => ({
          id: album.id,
          name: album.name,
          year: album.year,
          artistId: album.artistId,
        })),
      tracks: tracks
        .filter((track): track is NonNullable<typeof track> => track !== null)
        .map((track) => ({
          id: track.id,
          name: track.name,
          duration: track.duration,
          artistId: track.artistId,
          albumId: track.albumId,
        })),
    };
  }

  private async getOrCreateFavorites(): Promise<Favorites> {
    let favorites = await this.favoritesRepository.findFavorites();
    if (!favorites) {
      favorites = await this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
    }
    return favorites;
  }

  async addTrack(id: string): Promise<void> {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new Error('Track not found');
    }

    const favorites = await this.getOrCreateFavorites();

    if (favorites.tracks.includes(id)) {
      throw new Error('Track already in favorites');
    }

    favorites.tracks.push(id);
    await this.favoritesRepository.update(favorites.id, favorites);
  }

  async removeTrack(id: string): Promise<void> {
    const favorites = await this.favoritesRepository.findFavorites();
    if (!favorites || !favorites.tracks) {
      throw new Error('Track not found in favorites');
    }

    const index = favorites.tracks.indexOf(id);
    if (index === -1) {
      throw new Error('Track not found in favorites');
    }

    favorites.tracks.splice(index, 1);
    await this.favoritesRepository.update(favorites.id, favorites);
  }

  async addAlbum(id: string): Promise<void> {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new Error('Album not found');
    }

    const favorites = await this.getOrCreateFavorites();

    if (favorites.albums.includes(id)) {
      throw new Error('Album already in favorites');
    }

    favorites.albums.push(id);
    await this.favoritesRepository.update(favorites.id, favorites);
  }

  async removeAlbum(id: string): Promise<void> {
    const favorites = await this.favoritesRepository.findFavorites();
    if (!favorites || !favorites.albums) {
      throw new Error('Album not found in favorites');
    }

    const index = favorites.albums.indexOf(id);
    if (index === -1) {
      throw new Error('Album not found in favorites');
    }

    favorites.albums.splice(index, 1);
    await this.favoritesRepository.update(favorites.id, favorites);
  }

  async addArtist(id: string): Promise<void> {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new Error('Artist not found');
    }

    const favorites = await this.getOrCreateFavorites();

    if (favorites.artists.includes(id)) {
      throw new Error('Artist already in favorites');
    }

    favorites.artists.push(id);
    await this.favoritesRepository.update(favorites.id, favorites);
  }

  async removeArtist(id: string): Promise<void> {
    const favorites = await this.favoritesRepository.findFavorites();
    if (!favorites || !favorites.artists) {
      throw new Error('Artist not found in favorites');
    }

    const index = favorites.artists.indexOf(id);
    if (index === -1) {
      throw new Error('Artist not found in favorites');
    }

    favorites.artists.splice(index, 1);
    await this.favoritesRepository.update(favorites.id, favorites);
  }
}
