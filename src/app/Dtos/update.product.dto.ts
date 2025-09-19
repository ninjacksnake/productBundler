
import { IsNumber, IsOptional, IsString } from "class-validator";
   

export class UpdateProductDto  {
    @IsNumber()
    @IsOptional()
    id?: number;
  
    @IsString()
    @IsOptional()
    productId?: string;
  
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsNumber()
    @IsOptional()
    pricePM?: number;
  
    @IsNumber()
    @IsOptional()
    priceCF?: number;
  
    @IsNumber()
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    image?: string;
}
