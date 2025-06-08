import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, AlbumResponse } from './album.types';
import { AlbumRepository } from './album.repository';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistService: ArtistService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumResponse> {
    let artist = null;
    if (createAlbumDto.artistId) {
      artist = await this.artistService.findOne(createAlbumDto.artistId);
      if (!artist) {
        throw new Error('Artist not found');
      }
    }

    const album = await this.albumRepository.create({
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artist,
    });

    return this.albumRepository.findOneWithResponse(album.id);
  }

  async findAll(): Promise<AlbumResponse[]> {
    return this.albumRepository.findAllWithResponse();
  }

  async findOne(id: string): Promise<AlbumResponse | null> {
    return this.albumRepository.findOneWithResponse(id);
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumResponse | null> {
    return this.albumRepository.updateWithResponse(id, updateAlbumDto);
  }

  async remove(id: string): Promise<boolean> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      return false;
    }

    return this.albumRepository.delete(id);
  }
}
