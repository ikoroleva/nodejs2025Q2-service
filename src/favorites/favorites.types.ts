import { Request } from 'express';
import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.types';
import { Album } from '../album/album.types';
import { Track } from '../track/track.types';

export interface CustomRequest extends Request {
  user: User;
}

export interface Favorites {
  id: string;
  user: User;
  artists: string[];
  albums: string[];
  tracks: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
