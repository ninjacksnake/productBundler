import { AddProductDto } from "./add.product.dto";

export class AddBundleDto {
    id?: number;
    name?: string;
    description?: string;
    priceCF?: number;
    pricePM?: number;
    products?: AddProductDto[];
    createdDate?: Date;
    updatedDate?: Date;
}
