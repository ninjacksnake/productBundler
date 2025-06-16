import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddProductDto {
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
    price1!: number;
   
    @IsNumber() 
    @IsOptional()
    price2?: number;

    @IsNumber()    
    quantity?: number = 1;

    @IsNumber()    
    subtotal?: number = 0;  

    @IsNumber()    
    subtotal2?: number = 0;  

}