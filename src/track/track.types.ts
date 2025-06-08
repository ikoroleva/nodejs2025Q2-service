import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';

export interface Track {
  id: string;
  name: string;
  duration: number;
  album: Album;
  artist: Artist;
  createdAt: number;
  updatedAt: number;
}

export interface CreateTrackDto {
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
}

export interface UpdateTrackDto {
  name?: string;
  duration?: number;
  artistId?: string | null;
  albumId?: string | null;
}

export interface TrackResponse {
  id: string;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
  createdAt: number;
  updatedAt: number;
}
