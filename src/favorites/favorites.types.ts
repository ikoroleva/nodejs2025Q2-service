import { ArtistResponse } from '../artist/artist.types';
import { AlbumResponse } from '../album/album.types';
import { TrackResponse } from '../track/track.types';

export interface Favorites {
  id: string;
  artists: string[];
  albums: string[];
  tracks: string[];
  createdAt: number;
  updatedAt: number;
}

export interface FavoritesResponse {
  artists: ArtistResponse[];
  albums: AlbumResponse[];
  tracks: TrackResponse[];
}
