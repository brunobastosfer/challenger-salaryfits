import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class loginDto {
  @ApiProperty({
    example: 'dev@admin.com.br',
    description: 'email para entrar na aplicação.',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    example: 'Abc123!',
    description: 'Senha para entrar na aplicação.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password?: string;
  @IsEmpty()
  user?: User;
}
