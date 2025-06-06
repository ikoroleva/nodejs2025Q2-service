import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';

export interface Track {
  id: string;
  name: string;
  duration: number;
  album: Album;
  artist: Artist;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTrackDto {
  name: string;
  duration: number;
  album?: Album;
  artist?: Artist;
}

export interface UpdateTrackDto {
  name?: string;
  duration?: number;
  album?: Album;
  artist?: Artist;
}

export type TrackResponse = Track;
