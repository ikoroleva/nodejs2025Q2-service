import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { BaseRepository } from '../common/base.repository';
import { AlbumResponse, UpdateAlbumDto } from './album.types';

@Injectable()
export class AlbumRepository extends BaseRepository<Album> {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {
    super(albumRepository);
  }

  async findByArtistId(artistId: string): Promise<Album[]> {
    return this.albumRepository.find({
      where: { artist: { id: artistId } },
      relations: ['artist'],
    });
  }

  private transformToResponse(album: Album): AlbumResponse {
    const { artist, ...rest } = album;
    return {
      ...rest,
      artistId: artist?.id || null,
    };
  }

  async findOneWithResponse(id: string): Promise<AlbumResponse | null> {
    const album = await this.repository.findOne({
      where: { id: id },
      relations: ['artist'],
    });

    if (!album) {
      return null;
    }

    return this.transformToResponse(album);
  }

  async findAllWithResponse(): Promise<AlbumResponse[]> {
    const albums = await this.repository.find({
      relations: ['artist'],
    });

    return albums.map((album) => this.transformToResponse(album));
  }

  async updateWithResponse(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumResponse | null> {
    const album = await this.repository.findOne({
      where: { id },
      relations: ['artist'],
    });

    if (!album) {
      return null;
    }

    if (updateAlbumDto.artistId !== undefined) {
      album.artist = updateAlbumDto.artistId
        ? ({ id: updateAlbumDto.artistId } as any)
        : null;
    }

    if (updateAlbumDto.name !== undefined) {
      album.name = updateAlbumDto.name;
    }

    if (updateAlbumDto.year !== undefined) {
      album.year = updateAlbumDto.year;
    }

    const updatedAlbum = await this.repository.save(album);
    return this.transformToResponse(updatedAlbum);
  }
}
