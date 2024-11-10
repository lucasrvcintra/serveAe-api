import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  constructor(name: string, email: string, address: string, phone: string) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
  }

  @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
  @IsString({ message: 'O campo nome deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'O campo address não pode estar vazio.' })
  @IsString({ message: 'O campo address deve ser uma string.' })
  address: string;

  @IsNotEmpty({ message: 'O campo phone não pode estar vazio.' })
  @IsString({ message: 'O campo phone deve ser uma string.' })
  phone: string;
}
