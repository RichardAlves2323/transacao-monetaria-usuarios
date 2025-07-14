import { Injectable } from '@nestjs/common';
import { IHasher } from 'src/domain/interfaces/cryptography/cryptography.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IHasher {
  public async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
  }

  public async compare(text: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(text, hashed);
  }
}
