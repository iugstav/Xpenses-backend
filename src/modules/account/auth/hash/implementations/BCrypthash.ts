import { hash, compare } from "bcryptjs";
import { IHash } from "../IHash";

export class BCryptHash implements IHash {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
