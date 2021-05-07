import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1619809861205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
            id: SERIAL PRIMARY KEY
            username: VARCHAR(50) UNIQUE NOT NULL
            email: VARCHAR(50) UNIQUE NOT NULL
            first_name: VARCHAR(50) NOT NULL
            last_name: VARCHAR(50) NOT NULL
            password: VARCHAR()
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
