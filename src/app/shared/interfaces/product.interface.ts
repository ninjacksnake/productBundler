export interface IProduct {
    id: number;
    productId: string;
    name: string;
    description: string;
    pricePM: number;
    priceCF: number;
    priceDC: number;
    manualDoc: string;
    stock: number;
    image?: string;
    product?: IProduct;
}