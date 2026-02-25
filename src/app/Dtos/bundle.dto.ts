import { BundleProductDto } from "./bundle.product.dto";
import { ProductDto } from "./product.dto";

export class BundleDto {
    id?: number;
    name?: string;
    description?: string;
    priceCF?: number;
    pricePM?: number;
    priceDC?: number;
    products?: BundleProductDto[];
    createdDate?: Date;
    updatedDate?: Date;
}
