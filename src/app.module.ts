import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { TransferModule } from './transfer.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.orm-entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    TransferModule,
    AuthModule,
  ],
})
export class AppModule {}
