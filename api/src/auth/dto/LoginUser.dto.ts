import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiHideProperty()
  id: string;
  @ApiHideProperty()
  createdAt: Date;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
