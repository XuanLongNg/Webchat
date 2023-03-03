import * as bcrypt from "bcrypt";
export default class Hashing {
  private saltRound: number;
  constructor() {
    this.saltRound = 10;
  }
  public async hash(plaintext: string): Promise<string> {
    const result = await bcrypt.hash(plaintext, this.saltRound);
    return result;
  }
  public async compare(plaintext: string, textDB: string): Promise<boolean> {
    const result = await bcrypt.compare(plaintext, textDB);
    console.log(result);
    return result;
  }
}
