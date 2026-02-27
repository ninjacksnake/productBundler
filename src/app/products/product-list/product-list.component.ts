import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  filtredProducts: IProduct[] = [];
  searchTerm: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private cartSubscription: Subscription;
  cartItems: any[] = [];
  user: any;
  role: any;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private snackBar: MatSnackBar,

  ) {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
    });

  }

  public dataSource = new MatTableDataSource<IProduct>();

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.dataSource.data = products;
      this.filtredProducts = products;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  isInCart(productId: string): boolean {
    return this.cartItems.some(item => item.productId === productId);
  }

  filterProducts(): void {
    this.dataSource.data = this.filtredProducts.filter(product =>
      product.productId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  columns: string[] = [
    'productId',
    'name',
    'description',
    'pricePM',
    'priceCF',
    'priceDC',
    'options',
  ];

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
    this.snackBar.open('Product added to cart', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  removeFromCart(product: IProduct): void {
    this.cartService.removeFromCart(product);
    this.snackBar.open('Product removed from cart', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterProducts();
  }

  printDocument(product: IProduct) {
    if (product && product.manualDoc) {
      this.productService.getDocument(product.manualDoc).subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.click();
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      });
    }
  }
}
