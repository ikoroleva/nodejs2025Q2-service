import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { BaseRepository } from '../common/base.repository';

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
}
