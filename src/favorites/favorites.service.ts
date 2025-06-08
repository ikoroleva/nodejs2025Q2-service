import { Injectable } from '@nestjs/common';
import { Favorites, FavoritesResponse } from './favorites.types';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesRepository } from './favorites.repository';
import { User } from '../user/user.entity';
import { Album } from '../album/album.types';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async findAll(user: User): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.findByUserId(user.id);
    if (!favorites) {
      return { artists: [], albums: [], tracks: [] };
    }

    const artists = await Promise.all(
      favorites.artists.map((id) => this.artistService.findOne(id)),
    );
    const albums = await Promise.all(
      favorites.albums.map((id) => this.albumService.findOne(id)),
    );
    const tracks = await Promise.all(
      favorites.tracks.map((id) => this.trackService.findOne(id)),
    );

    return {
      artists: artists.filter(
        (artist): artist is NonNullable<typeof artist> => artist !== null,
      ),
      /*albums: albums.filter(
        (album): album is NonNullable<typeof album> => album !== null,
      ) as Album[],*/
      albums: null,
      /*tracks: tracks.filter(
        (track): track is NonNullable<typeof track> => track !== null,
      ),*/
      tracks: null,
    };
  }

  async addTrack(user: User, id: string): Promise<void> {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new Error('Track not found');
    }

    let favorites = await this.favoritesRepository.findByUserId(user.id);
    if (!favorites) {
      favorites = await this.favoritesRepository.create({
        user,
        artists: [],
        albums: [],
        tracks: [],
      });
    }

    if (!favorites.tracks.includes(id)) {
      favorites.tracks.push(id);
      await this.favoritesRepository.update(favorites.id, favorites);
    }
  }

  async removeTrack(user: User, id: string): Promise<void> {
    const favorites = await this.favoritesRepository.findByUserId(user.id);
    if (!favorites) {
      throw new Error('Track not found in favorites');
    }

    const index = favorites.tracks.indexOf(id);
    if (index === -1) {
      throw new Error('Track not found in favorites');
    }

    favorites.tracks.splice(index, 1);
    await this.favoritesRepository.update(favorites.id, favorites);
  }

  async addAlbum(user: User, id: string): Promise<void> {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new Error('Album not found');
    }

    let favorites = await this.favoritesRepository.findByUserId(user.id);
    if (!favorites) {
      favorites = await this.favoritesRepository.create({
        user,
        artists: [],
        albums: [],
        tracks: [],
      });
    }

    if (!favorites.albums.includes(id)) {
      favorites.albums.push(id);
      await this.favoritesRepository.update(favorites.id, favorites);
    }
  }

  async removeAlbum(user: User, id: string): Promise<void> {
    const favorites = await this.favoritesRepository.findByUserId(user.id);
    if (!favorites) {
      throw new Error('Album not found in favorites');
    }

    const index = favorites.albums.indexOf(id);
    if (index === -1) {
      throw new Error('Album not found in favorites');
    }

    favorites.albums.splice(index, 1);
    await this.favoritesRepository.update(favorites.id, favorites);
  }

  async addArtist(user: User, id: string): Promise<void> {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new Error('Artist not found');
    }

    let favorites = await this.favoritesRepository.findByUserId(user.id);
    if (!favorites) {
      favorites = await this.favoritesRepository.create({
        user,
        artists: [],
        albums: [],
        tracks: [],
      });
    }

    if (!favorites.artists.includes(id)) {
      favorites.artists.push(id);
      await this.favoritesRepository.update(favorites.id, favorites);
    }
  }

  async removeArtist(user: User, id: string): Promise<void> {
    const favorites = await this.favoritesRepository.findByUserId(user.id);
    if (!favorites) {
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
