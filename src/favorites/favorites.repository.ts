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

  async findFavorites(): Promise<Favorites | null> {
    return this.favoritesRepository.findOne({
      where: {},
    });
  }

  async updateFavorites(id: string): Promise<Favorites | null> {
    const entity = await this.findById(id);
    if (!entity) {
      return null;
    }

    return this.repository.save(entity);
  }
}
