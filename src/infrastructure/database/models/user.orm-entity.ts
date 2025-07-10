import { User } from 'src/domain/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserTypeOrm {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  birthdate: string;

  @Column()
  balance: number;

  static toDomain(userTypeOrm: UserTypeOrm): User {
    return new User(
      userTypeOrm.username,
      userTypeOrm.password,
      userTypeOrm.birthdate,
      userTypeOrm.balance,
      userTypeOrm.id,
    );
  }

  static fromDomain(user: User): UserTypeOrm {
    const userTypeOrm = new UserTypeOrm();
    userTypeOrm.id = user.getId();
    userTypeOrm.username = user.getUserName();
    userTypeOrm.password = user.getPassword();
    userTypeOrm.birthdate = user.getBirthdate();
    userTypeOrm.balance = user.getBalance();

    return userTypeOrm;
  }
}
