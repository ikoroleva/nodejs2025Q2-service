import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { BaseRepository } from '../common/base.repository';
import { CreateTrackDto, UpdateTrackDto, TrackResponse } from './track.types';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';

@Injectable()
export class TrackRepository extends BaseRepository<Track> {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {
    super(trackRepository);
  }

  private transformToResponse(track: Track): TrackResponse {
    const { artist, album, ...rest } = track;
    return {
      ...rest,
      artistId: artist?.id || null,
      albumId: album?.id || null,
    };
  }

  async findByAlbumId(albumId: string): Promise<Track[]> {
    return this.trackRepository.find({
      where: { album: { id: albumId } },
      relations: ['album', 'artist'],
    });
  }

  async findByArtistId(artistId: string): Promise<Track[]> {
    return this.trackRepository.find({
      where: { artist: { id: artistId } },
      relations: ['artist', 'album'],
    });
  }

  async findOneWithResponse(id: string): Promise<TrackResponse | null> {
    const track = await this.repository.findOne({
      where: { id },
      relations: ['artist', 'album'],
    });

    if (!track) {
      return null;
    }

    return this.transformToResponse(track);
  }

  async findAllWithResponse(): Promise<TrackResponse[]> {
    const tracks = await this.repository.find({
      relations: ['artist', 'album'],
    });

    return tracks.map((track) => this.transformToResponse(track));
  }

  async createWithResponse(
    createTrackDto: CreateTrackDto,
  ): Promise<TrackResponse> {
    const track = await this.repository.save({
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artist: createTrackDto.artistId
        ? ({ id: createTrackDto.artistId } as Artist)
        : null,
      album: createTrackDto.albumId
        ? ({ id: createTrackDto.albumId } as Album)
        : null,
    });

    const savedTrack = await this.repository.findOne({
      where: { id: track.id },
      relations: ['artist', 'album'],
    });

    return this.transformToResponse(savedTrack);
  }

  async updateWithResponse(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackResponse | null> {
    const track = await this.repository.findOne({
      where: { id },
      relations: ['artist', 'album'],
    });

    if (!track) {
      return null;
    }

    if (updateTrackDto.artistId !== undefined) {
      track.artist = updateTrackDto.artistId
        ? ({ id: updateTrackDto.artistId } as Artist)
        : null;
    }

    if (updateTrackDto.albumId !== undefined) {
      track.album = updateTrackDto.albumId
        ? ({ id: updateTrackDto.albumId } as Album)
        : null;
    }

    if (updateTrackDto.name !== undefined) {
      track.name = updateTrackDto.name;
    }

    if (updateTrackDto.duration !== undefined) {
      track.duration = updateTrackDto.duration;
    }

    const updatedTrack = await this.repository.save(track);
    return this.transformToResponse(updatedTrack);
  }
}
