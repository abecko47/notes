import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDtoDto {
  @ApiProperty()
  accessToken: string;
}
