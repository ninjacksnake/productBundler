import { Component } from '@angular/core';
import { AddProductDto } from '../Dtos/add.product.dto';
import { CartService } from '../shared/services/cart.service';

const testData: AddProductDto[] = [
  {
    productId: 'prod-001',
    name: 'Product 1',
    description: 'Description for Product 1',
    pricePM: 100.00,
    priceCF: 120.00,
  },
  {
    productId: 'prod-002',
    name: 'Product 2',
    description: 'Description for Product 2',
    pricePM: 200.00,
    priceCF: 220.00
  },
  {
    productId: 'prod-003',
    name: 'Product 3',
    description: 'Description for Product 3',
    pricePM: 300.00,
    priceCF: undefined // Optional field
  }
];

const filterData = (filter: string ) => {
  return testData.filter((item) => item.name === filter);
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

export class ProductsComponent {
  constructor(private cartService: CartService) {}
  
  columns: string[] = ['productId', 'name', 'description', 'pricePM', 'priceCF', 'options'];
  products: AddProductDto[] = testData;
  filter: (filter: string) => AddProductDto[] = filterData; 
  
  addToCart(product: AddProductDto): void {
    this.cartService.addToCart(product);
  }
  
  removeFromCart(product: AddProductDto): void {
    this.cartService.removeFromCart(product);
  }
}
