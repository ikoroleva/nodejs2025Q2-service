import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1710000000000 implements MigrationInterface {
    name = 'CreateInitialTables1710000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                "version" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
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
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_artists" PRIMARY KEY ("id")
            )
        `);

        // Create albums table
        await queryRunner.query(`
            CREATE TABLE "albums" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "year" integer NOT NULL,
                "artistId" uuid,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
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
                "albumId" uuid,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_tracks" PRIMARY KEY ("id"),
                CONSTRAINT "FK_tracks_album" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL
            )
        `);

        // Create favorites table
        await queryRunner.query(`
            CREATE TABLE "favorites" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "artistId" uuid,
                "albumId" uuid,
                "trackId" uuid,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_favorites" PRIMARY KEY ("id"),
                CONSTRAINT "FK_favorites_artist" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_favorites_album" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_favorites_track" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE
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