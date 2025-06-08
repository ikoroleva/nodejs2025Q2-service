import { Injectable } from '@nestjs/common';
import {
  CreateArtistDto,
  UpdateArtistDto,
  ArtistResponse,
} from './artist.types';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistResponse> {
    return this.artistRepository.create(createArtistDto);
  }

  async findAll(): Promise<ArtistResponse[]> {
    return this.artistRepository.findAll();
  }

  async findOne(id: string): Promise<ArtistResponse | null> {
    return this.artistRepository.findById(id);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistResponse | null> {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      return null;
    }

    return this.artistRepository.update(id, {
      ...artist,
      ...updateArtistDto,
    });
  }

  async remove(id: string): Promise<boolean> {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      return false;
    }

    const isDeleted = await this.artistRepository.delete(id);
    if (!isDeleted) {
      return false;
    }

    return true;
  }
}
