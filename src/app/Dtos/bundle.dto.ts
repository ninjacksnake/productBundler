import { ProductDto } from "./product.dto";

export class BundleDto {
    id?: number;
    name?: string;
    description?: string;
    priceCF?: number;
    pricePM?: number;
    products?: ProductDto[];
    createdDate?: Date;
    updatedDate?: Date;
}
