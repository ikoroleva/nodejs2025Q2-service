import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';
import { BaseRepository } from '../common/base.repository';

@Injectable()
export class FavoritesRepository extends BaseRepository<Favorites> {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
  ) {
    super(favoritesRepository);
  }

  async findByUserId(userId: string): Promise<Favorites | null> {
    return this.favoritesRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
