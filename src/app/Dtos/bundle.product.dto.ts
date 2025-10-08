import { ProductDto } from "./product.dto";

export class BundleProductDto {
  id?: number;
  bundleId?: number;
  productId?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  quantity?: number;
  product?: ProductDto;
}
