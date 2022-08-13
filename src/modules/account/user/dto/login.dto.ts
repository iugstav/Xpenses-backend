import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}
