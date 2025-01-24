import { IsString } from 'class-validator';

export class ListOrdersByAddressDto {
  @IsString()
  address: string;
}
