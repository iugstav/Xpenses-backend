export interface IHash {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashedValue: string): Promise<boolean>;
}
