import { Transfer } from 'src/domain/entities/transfer.entity';
import { TransferTypeOrm } from 'src/infrastructure/database/models/transfer.orm-entity';
import { TransferRepositoryByTypeOrm } from 'src/infrastructure/database/repositories/transfer.repository.by-typeorm';
import { DataSource } from 'typeorm';

describe('TransferRepository (TypeORM)', () => {
  let dataSource: DataSource;
  let transferRepository: TransferRepositoryByTypeOrm;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory',
      entities: [TransferTypeOrm],
      synchronize: true,
    });
    await dataSource.initialize();

    transferRepository = new TransferRepositoryByTypeOrm(
      dataSource.getRepository(TransferTypeOrm),
    );
  });

  beforeEach(async () => {
    await dataSource.getRepository(TransferTypeOrm).clear();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('deve ser possivel salvar uma transferencia', async () => {
    const savedTransfer = await transferRepository.save(
      new Transfer('1', '2', 100),
    );

    expect(savedTransfer).toHaveProperty('_id');
    expect(savedTransfer.getFromId()).toBe('1');
  });

  it('deve ser possivel listar todas as transferencia', async () => {
    await transferRepository.save(new Transfer('1', '2', 100));
    await transferRepository.save(new Transfer('2', '1', 200));

    const transfers = await transferRepository.findAll();

    expect(transfers.length).toBe(2);
  });

  it('deve ser possivel listar todas as transferencia que um usuário participou', async () => {
    await transferRepository.save(new Transfer('1', '2', 100));
    await transferRepository.save(new Transfer('2', '1', 200));

    const transfers = await transferRepository.findByUserId('1');

    expect(transfers.length).toBe(2);
  });
});
