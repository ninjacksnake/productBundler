import { AddProductDto } from "./add.product.dto";

export class AddBundleDto {
    id?: number;
    name?: string;
    description?: string;
    price1?: number;
    price2?: number;
    products?: AddProductDto[];
    createdDate?: Date;
    updatedDate?: Date;
}
