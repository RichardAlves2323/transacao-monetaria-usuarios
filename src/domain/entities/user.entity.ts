import { InvalidPasswordError } from '../errors/invalid-password.error';
import { InvalidTransferValueError } from '../errors/invalid-transfer-value.error';
import { InvalidUsernameError } from '../errors/invalid-username.error';

export class User {
  private _id?: string;
  private _username: string;
  private _password: string;
  private _birthdate: string;
  private _balance: number;

  constructor(
    username: string,
    password: string,
    birthdate: string,
    balance: number = 0,
    id?: string,
  ) {
    this._username = this.checkUsername(username);
    this._password = this.checkPassword(password);
    this._birthdate = birthdate;
    this._balance = balance;
    this._id = id;
  }

  public getId(): string | undefined {
    return this._id;
  }

  public setId(id: string) {
    this._id = id;
  }

  public getUserName(): string {
    return this._username;
  }

  public setUserName(username: string) {
    this._username = this.checkUsername(username);
  }

  private checkUsername(username: string): string {
    const numberCharacters: number = 0;

    if (username.trim().length === numberCharacters)
      throw new InvalidUsernameError();

    return username;
  }

  public getPassword(): string {
    return this._password;
  }

  public setPassword(password: string) {
    this._password = this.checkPassword(password);
  }

  public getBirthdate(): string {
    return this._birthdate;
  }

  public setBirthdate(birthdate: string) {
    this._birthdate = birthdate;
  }

  public getBalance(): number {
    return this._balance;
  }

  private checkPassword(password: string): string {
    const numberCharacters: number = 8;

    if (password.length < numberCharacters) throw new InvalidPasswordError();

    return password;
  }

  public addToBalance(amount: number) {
    this._balance += this.checkTransferBalance(amount);
  }

  public subtractFromBalance(amount: number) {
    this._balance -= this.checkTransferBalance(amount);
  }

  private checkTransferBalance(amount: number): number {
    if (amount <= 0) throw new InvalidTransferValueError();

    return amount;
  }
}
