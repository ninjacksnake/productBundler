
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddProductBundleDto {
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
    quantity?: number;

    @IsNumber()
    @IsOptional()
    subtotal1?: number;

    @IsNumber()
    @IsOptional()
    subtotal2?: number;

    @IsNumber()
    @IsOptional()
    subtotal3?: number;








}