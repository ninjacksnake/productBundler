import { IsString, IsNotEmpty, IsNumber, IsOptional, IsObject } from 'class-validator';

export class AddProductDto {
  @IsNumber()
  @IsNotEmpty()
  id?: number;

  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  pricePM!: number;

  @IsNumber()
  @IsOptional()
  priceCF?: number;

  @IsNumber()
  @IsOptional()
  priceDC?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsObject()
  @IsOptional()
  imageData?: Object;

  @IsNumber()
  quantity?: number = 1;
}
