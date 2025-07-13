import { InvalidTransferValueError } from '../errors/invalid-transfer-value.error';

export class Transfer {
  private id?: string;
  private fromId: string;
  private toId: string;
  private amount: number;

  constructor(fromId: string, toId: string, amount: number, id?: string) {
    this.fromId = fromId;
    this.toId = toId;
    this.amount = this.checkAmount(amount);
    this.id = id;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getFromId(): string {
    return this.fromId;
  }

  public getToId(): string {
    return this.toId;
  }

  public getAmount(): number {
    return this.amount;
  }

  private checkAmount(amount: number): number {
    if (amount <= 0) throw new InvalidTransferValueError();

    return amount;
  }
}
