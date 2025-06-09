export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface CreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface UpdateArtistDto {
  name: string;
  grammy: boolean;
}

export interface ArtistResponse {
  id: string;
  name: string;
  grammy: boolean;
}
