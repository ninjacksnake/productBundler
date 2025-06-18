import { AddProductDto } from "src/app/Dtos/add.product.dto";

export interface BundleDto {
  id?: number;
  name: string;
  description: string;
  products: AddProductDto[];
  priceCF: number;
  pricePM: number;
  createdDate: Date;
  updatedDate: Date;
}
