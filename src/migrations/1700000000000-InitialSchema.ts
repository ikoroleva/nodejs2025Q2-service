import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "login" character varying NOT NULL,
        "password" character varying NOT NULL,
        "version" integer NOT NULL,
        "createdAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        "updatedAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        CONSTRAINT "UQ_users_login" UNIQUE ("login"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    // Create artists table
    await queryRunner.query(`
      CREATE TABLE "artists" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "grammy" boolean NOT NULL,
        "createdAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        "updatedAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        CONSTRAINT "PK_artists" PRIMARY KEY ("id")
      )
    `);

    // Create albums table
    await queryRunner.query(`
      CREATE TABLE "albums" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "year" integer NOT NULL,
        "createdAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        "updatedAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        "artistId" uuid,
        CONSTRAINT "PK_albums" PRIMARY KEY ("id"),
        CONSTRAINT "FK_albums_artist" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL
      )
    `);

    // Create tracks table
    await queryRunner.query(`
      CREATE TABLE "tracks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "duration" integer NOT NULL,
        "createdAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        "updatedAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        "albumId" uuid,
        "artistId" uuid,
        CONSTRAINT "PK_tracks" PRIMARY KEY ("id"),
        CONSTRAINT "FK_tracks_album" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL,
        CONSTRAINT "FK_tracks_artist" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL
      )
    `);

    // Create favorites table
    await queryRunner.query(`
      CREATE TABLE "favorites" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        "updatedAt" bigint NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000,
        "artists" text[] NOT NULL DEFAULT '{}',
        "albums" text[] NOT NULL DEFAULT '{}',
        "tracks" text[] NOT NULL DEFAULT '{}',
        CONSTRAINT "PK_favorites" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(`DROP TABLE "albums"`);
    await queryRunner.query(`DROP TABLE "artists"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
