/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from 'src/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferModule } from 'src/transfer.module';
import { AllExceptionsFilter } from 'src/presentation/errors/exception.filter';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../../src/**/*.orm-entity{.ts,.js}'],
          synchronize: true,
        }),
        UserModule,
        TransferModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();

    dataSource = app.get(DataSource);
  });

  afterEach(async () => {
    const entities = dataSource.entityMetadatas;

    for (const entity of entities) {
      await dataSource.getRepository(entity.name).clear();
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve ser possivel realizar transferencia entre usuários', async () => {
    await request(app.getHttpServer()).post('/users/singup').send({
      username: 'test',
      password: '12345678',
      birthdate: '1999-07-23',
    });

    await request(app.getHttpServer()).post('/users/singup').send({
      username: 'test2',
      password: '12345678',
      birthdate: '1999-07-23',
    });

    const authResponse = await request(app.getHttpServer())
      .post('/users/singin')
      .send({
        username: 'test',
        password: '12345678',
      });

    const transferResponse = await request(app.getHttpServer())
      .post('/transfer')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        fromId: '1',
        toId: '2',
        amount: 100,
      });

    expect(transferResponse.status).toBe(204);
  });

  it('não deve ser possivel realizar uma transferencia com o valor negativo', async () => {
    await request(app.getHttpServer()).post('/users/singup').send({
      username: 'test',
      password: '12345678',
      birthdate: '1999-07-23',
    });

    await request(app.getHttpServer()).post('/users/singup').send({
      username: 'test2',
      password: '12345678',
      birthdate: '1999-07-23',
    });

    const authResponse = await request(app.getHttpServer())
      .post('/users/singin')
      .send({
        username: 'test',
        password: '12345678',
      });

    const transferResponse = await request(app.getHttpServer())
      .post('/transfer')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        fromId: '1',
        toId: '2',
        amount: -100,
      });

    expect(transferResponse.status).toBe(400);
  });

  it('não deve ser possivel realizar uma transferencia sem autenticação', async () => {
    const transferResponse = await request(app.getHttpServer())
      .post('/transfer')
      .send({
        fromId: '1',
        toId: '2',
        amount: 100,
      });

    expect(transferResponse.status).toBe(401);
  });
});
