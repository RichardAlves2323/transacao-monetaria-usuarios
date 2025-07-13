/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from 'src/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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

  it('deve ser possivel criar um usuário', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/users/singup')
      .send({
        username: 'test',
        password: '12345678',
        birthdate: '1999-07-23',
      });

    expect(createUserResponse.body).toHaveProperty('id');
    expect(createUserResponse.status).toBe(201);
  });

  it('não deve ser possiver criar usuário com o uername em branco', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/users/singup')
      .send({
        username: '',
        password: '12345678',
        birthdate: '1999-07-23',
      });

    expect(createUserResponse.status).toBe(400);
  });

  it('não deve ser possiver criar usuário com a senha menor que 8 caracteres', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/users/singup')
      .send({
        username: 'test',
        password: '12345',
        birthdate: '1999-07-23',
      });

    expect(createUserResponse.status).toBe(400);
  });

  it('deve ser possivel se autenticar', async () => {
    await request(app.getHttpServer()).post('/users/singup').send({
      username: 'test',
      password: '12345678',
      birthdate: '1999-07-23',
    });

    const authResponse = await request(app.getHttpServer())
      .post('/users/singin')
      .send({
        username: 'test',
        password: '12345678',
      });

    expect(authResponse.body).toHaveProperty('token');
    expect(authResponse.body).toHaveProperty('expiresIn');
    expect(authResponse.status).toBe(200);
  });

  it('deve ser possivel listar todos usuários caso esteja autenticado', async () => {
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

    const usersResponse = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authResponse.body.token}`);

    expect(usersResponse.status).toBe(200);
    expect(usersResponse.body.length).toBe(2);
    expect(usersResponse.body[0]).not.toHaveProperty('password');
  });

  it('não deve ser possivel listar os usuários caso não tenha sido autenticado', async () => {
    await request(app.getHttpServer()).post('/users/singup').send({
      username: 'test',
      password: '12345678',
      birthdate: '1999-07-23',
    });

    const usersResponse = await request(app.getHttpServer()).get('/users');

    expect(usersResponse.status).toBe(401);
  });
});
