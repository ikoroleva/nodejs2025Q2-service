import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { BaseRepository } from '../common/base.repository';

@Injectable()
export class ArtistRepository extends BaseRepository<Artist> {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {
    super(artistRepository);
  }
}
