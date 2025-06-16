import { AddProductDto } from "src/app/Dtos/add.product.dto";

export class BundleDto {
  id?: number;
  name: string;
  description: string;
  products: AddProductDto[];
  PriceCF: number;
  PricePM: number;
  createdDate: Date;
  updatedDate: Date;

  constructor( name: string, description: string, products: AddProductDto[], PriceCF: number, PricePM: number, createdDate?: Date, updatedDate?: Date) {
  
    this.name = name;
    this.description = description;
    this.products = products;
    this.PriceCF = PriceCF;
    this.PricePM = PricePM;
    this.createdDate = createdDate ? createdDate : new Date();
    this.updatedDate = updatedDate ? updatedDate : new Date();
 
  }
}
