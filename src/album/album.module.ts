import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepository } from './album.repository';
import { Album } from './album.entity';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), TrackModule, ArtistModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService],
})
export class AlbumModule {}
