import { AddProductDto } from "src/app/Dtos/add.product.dto";

export interface IBundle {
  id?: number;
  bundleId: string;
  name: string;
  description: string;
  products: AddProductDto[];
  priceCF: number;
  pricePM: number;
  createdDate: Date;
  updatedDate: Date;
}
