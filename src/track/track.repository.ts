import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { BaseRepository } from '../common/base.repository';

@Injectable()
export class TrackRepository extends BaseRepository<Track> {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {
    super(trackRepository);
  }

  async findByAlbumId(albumId: string): Promise<Track[]> {
    return this.trackRepository.find({
      where: { album: { id: albumId } },
      relations: ['album'],
    });
  }

  async findByArtistId(artistId: string): Promise<Track[]> {
    return this.trackRepository.find({
      where: { artist: { id: artistId } },
      relations: ['artist'],
    });
  }
}
