import { InvalidPasswordError } from '../errors/invalid-password.error';
import { InvalidTransferValueError } from '../errors/invalid-transfer-value.error';
import { InvalidUsernameError } from '../errors/invalid-username.error';

export class User {
  private id?: string;
  private username: string;
  private password: string;
  private birthdate: string;
  private balance: number;

  constructor(
    username: string,
    password: string,
    birthdate: string,
    balance: number = 0,
    id?: string,
  ) {
    this.username = this.checkUsername(username);
    this.password = this.checkPassword(password);
    this.birthdate = birthdate;
    this.balance = balance;
    this.id = id;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getUserName(): string {
    return this.username;
  }

  public setUserName(username: string) {
    this.username = this.checkUsername(username);
  }

  private checkUsername(username: string): string {
    const numberCharacters: number = 0;

    if (username.trim().length === numberCharacters)
      throw new InvalidUsernameError();

    return username;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = this.checkPassword(password);
  }

  public getBirthdate(): string {
    return this.birthdate;
  }

  public setBirthdate(birthdate: string) {
    this.birthdate = birthdate;
  }

  public getBalance(): number {
    return this.balance;
  }

  private checkPassword(password: string): string {
    const numberCharacters: number = 8;

    if (password.length < numberCharacters) throw new InvalidPasswordError();

    return password;
  }

  public addToBalance(amount: number) {
    this.balance += this.checkTransferBalance(amount);
  }

  public subtractFromBalance(amount: number) {
    this.balance -= this.checkTransferBalance(amount);
  }

  private checkTransferBalance(amount: number): number {
    if (amount <= 0) throw new InvalidTransferValueError();

    return amount;
  }
}
