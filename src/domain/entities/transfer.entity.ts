export class Transfer {
  private _id?: string;
  private _fromId: string;
  private _toId: string;
  private _amount: number;

  constructor(fromId: string, toId: string, amount: number, id?: string) {
    this._fromId = fromId;
    this._toId = toId;
    this._amount = this.checkAmount(amount);
    this._id = id;
  }

  public getId(): string | undefined {
    return this._id;
  }

  public getFromId(): string {
    return this._fromId;
  }

  public getToId(): string {
    return this._toId;
  }

  public getAmount(): number {
    return this._amount;
  }

  private checkAmount(amount: number): number {
    if (amount <= 0)
      throw new Error('O valor da transferencia deve ser maior que 0');

    return amount;
  }
}
