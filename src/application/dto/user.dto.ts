import { User } from 'src/domain/entities/user.entity';

export class UserDTO {
  id?: string;
  username: string;
  birthdate: string;
  balance: string;

  static fromDomain(user: User): UserDTO {
    const userDTO = new UserDTO();
    userDTO.id = user.getId();
    userDTO.username = user.getUserName();
    userDTO.birthdate = user.getBirthdate();
    userDTO.balance = user.getBalance().toFixed(2);

    return userDTO;
  }
}
