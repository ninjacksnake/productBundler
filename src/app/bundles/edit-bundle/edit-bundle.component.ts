import { Component } from '@angular/core';
import { BundlesService } from '../../shared/services/bundles.service';
import { ProductService } from '../../shared/services/product.service';
import { BundleDto } from '../../Dtos/bundle.dto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from '../../Dtos/product.dto';
import { AddProductDto } from '../../Dtos//add.product.dto';
import { MatTableDataSource } from '@angular/material/table';
import { BundleProductDto } from '../../Dtos/bundle.product.dto';

@Component({
  selector: 'app-edit-bundle',
  templateUrl: './edit-bundle.component.html',
  styleUrls: ['./edit-bundle.component.css'],
})
export class EditBundleComponent {
  bundle: BundleDto = {} as BundleDto;
  bundleForm!: FormGroup;
  search: string = '';
  productToAdd!: AddProductDto[] | null;
  products!: BundleProductDto[];
  fetching: boolean = false;
  dataSource!: MatTableDataSource<BundleProductDto>;
  lastSearch: string = '';

  columns = ['productId', 'name', 'quantity', 'pricePM', 'priceCF', 'priceDC', 'options'];
  totalCF = 0;
  totalPM = 0;
  totalDC = 0;

  constructor(
    private bundlesService: BundlesService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.bundlesService
      .getById(this.route.snapshot.params['id'])
      .subscribe((_bundle: BundleDto) => {
        this.bundle = _bundle;
        // console.log(this.bundle);
        this.products = this.getProductsFromBundle(_bundle);
        this.bundleForm.patchValue(_bundle);
        this.dataSource = new MatTableDataSource(this.products);
        this.setTotals();
      });
  }

  private initForm() {
    this.bundleForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      pricePM: [0],
      priceCF: [0],
      priceDC: [0],
    });
    this.search = '';
  }

  private getProductsFromBundle(_bundle: BundleDto) {
    const bundleProducts = _bundle.products?.map(
      (product) => product
    ) as BundleProductDto[];
    return bundleProducts;
  }

  // clean search input
  cleanSearch() {
    this.search = '';
    this.productToAdd = null;
  }

  // check if search input is empty
  checkEmpty() {
    if (this.search.length === 0) {
      this.productToAdd = null;
    }
  }

  // search product
  searchProduct() {
    if (this.search.length === 0) {
      this.productToAdd = null;
    }
    if (this.search.length > 0) {
      this.fetching = true;
      setTimeout(() => {
        this.productService
          .getProductByName(this.search)
          .subscribe((product: ProductDto[]) => {
            this.productToAdd = product;
          });
        this.fetching = false;
      }, 1000);
    }
  }

  private isProductInBundle(product: AddProductDto) {
    return this.products.some((p) => p.productId === product.productId);
  }

  addProduct(product: AddProductDto) {
    // check if product is already in bundle
    if (!this.isProductInBundle(product)) {
      // if product is not in bundle
      let productBundle = this.buildBundleProduct(product, 1);
      this.bundle.products?.push(productBundle);
      this.products = this.getProductsFromBundle(this.bundle);
      this.dataSource.data = this.products;
      this.setTotals();
    } else {
      // if product is in bundle
      this.bundle.products?.map((p: BundleProductDto) => {
        if (p.productId === product.productId) {
          p.quantity = p.quantity ? p.quantity + 1 : 1;
          // console.log(this.products);
        }
      });
      this.products = this.getProductsFromBundle(this.bundle);
      this.dataSource.data = this.products;
      this.setTotals();
    }
  }

  private buildBundleProduct(product: ProductDto, quantity: number) {
    let index = this.bundle?.products?.length;
    index = index ? index : 0; // if index is null, set it to 0
    index++;
    // console.log(index);
    const bundleProduct: any = {
      id: index,
      bundleId: this.bundle.name,
      productId: product.productId,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 1,
      product: product,
    };
    return bundleProduct;
  }

  enter(event: KeyboardEvent) {
    if (this.search !== this.lastSearch) {
      if (!this.fetching) {
        this.searchProduct();
      }
    }
    this.lastSearch = this.search;
  }

  private setTotals() {
    this.updateTotalPM();
    this.updateTotalCF();
    this.updateTotalDC();
    this.setBundleTotals()
  }


  private updateTotalPM() {
    this.totalPM = this.bundle.products?.reduce((acc, item) =>
      acc + (item.product?.pricePM || 0) * (item.quantity || 0), 0) || 0;
  }

  private updateTotalCF() {
    this.totalCF = this.bundle.products?.reduce((acc, item) =>
      acc + (item.product?.priceCF || 0) * (item.quantity || 0), 0) || 0;
  }

  private updateTotalDC() {
    this.totalDC = this.bundle.products?.reduce((acc, item) =>
      acc + (item.product?.priceDC || 0) * (item.quantity || 0), 0) || 0;
  }


  private setBundleTotals() {
    this.bundle.priceCF = this.totalCF;
    this.bundle.pricePM = this.totalPM;
    this.bundle.priceDC = this.totalDC;
    this.bundleForm.patchValue({
      priceCF: this.totalCF,
      pricePM: this.totalPM,
      priceDC: this.totalDC
    });
  }

  countProducts() {
    return this.bundle.products?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  }

  deleteProduct(id: number) {
    // console.log(id);
    // this.products = this.products.filter((product) => product.id !== id);
    this.bundle.products = this.bundle.products?.filter(
      (product) => product.id !== id
    );
    this.products = this.getProductsFromBundle(this.bundle);
    this.setTotals();
    this.dataSource.data = this.products;
  }

  deleteAllProducts() {
    this.products = [];
  }

  updateBundle() {
    this.bundleForm.value.products = this.products;
    this.bundlesService
      .update(this.bundleForm.value.id, this.bundleForm.value)
      .subscribe((bundle: BundleDto) => {
        this.snackBar.open('Bundle updated successfully', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.back();
      });
  }

  back() {
    this.router.navigate(['/bundler/bundles']);
  }
}
