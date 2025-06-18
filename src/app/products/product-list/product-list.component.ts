import { Component } from '@angular/core';
import { AddProductDto } from '../../Dtos/add.product.dto';
import { CartService } from '../../shared/services/cart.service';
import { Router } from '@angular/router';

const testData: AddProductDto[] = [
  {
    productId: 'prod-001',
    name: 'Product 1',
    description: 'Description for Product 1',
    price1: 100.00,
    price2: 120.00,
  },
  {
    productId: 'prod-002',
    name: 'Product 2',
    description: 'Description for Product 2',
    price1: 200.00,
    price2: 220.00
  },
  {
    productId: 'prod-003',
    name: 'Product 3',
    description: 'Description for Product 3',
    price1: 300.00,
    price2: undefined // Optional field
  }
];

const filterData = (filter: string ) => {
  return testData.filter((item) => item.name === filter);
}

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent {
  constructor(private cartService: CartService, private router: Router  ) {}
  
  columns: string[] = ['productId', 'name', 'description', 'price1', 'price2', 'options'];
  products: AddProductDto[] = testData;
  filter: (filter: string) => AddProductDto[] = filterData; 
  
  addToCart(product: AddProductDto): void {
    this.cartService.addToCart(product);
  }
      
      removeFromCart(product: AddProductDto): void {
    this.cartService.removeFromCart(product);
  }

  
}
