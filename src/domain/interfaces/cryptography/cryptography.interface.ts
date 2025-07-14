export interface IHasher {
  hash(text: string): Promise<string>;
  compare(text: string, hashed: string): Promise<boolean>;
}
