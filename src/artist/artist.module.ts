import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepository } from './artist.repository';
import { Artist } from './artist.entity';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), TrackModule],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService],
})
export class ArtistModule {}
