import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  readonly password: string;

  @IsDate()
  readonly createdAt: Date;

  constructor(name: string, email: string, password: string, createdAt: Date) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }
}
