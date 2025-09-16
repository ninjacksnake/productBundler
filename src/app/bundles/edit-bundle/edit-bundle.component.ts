import { Component } from '@angular/core';
import { BundlesService } from '../../shared/services/bundles.service';
import { BundleDto } from '../../Dtos/bundle.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from '../../Dtos/product.dto';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-edit-bundle',
  templateUrl: './edit-bundle.component.html',
  styleUrls: ['./edit-bundle.component.css'],
})
export class EditBundleComponent {
  bundle: BundleDto = {} as BundleDto;
  bundleForm!: FormGroup;
  products!: ProductDto[];
  columns = [
    'productId',
    'name',
    'priceCF',
    'pricePM',
    'quantity', 
    'options',
  ];
  totalCF = 0;
  totalPM = 0;

  constructor(
    private bundlesService: BundlesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bundlesService
      .getById(this.route.snapshot.params['id'])
      .subscribe((_bundle: BundleDto) => {
        this.bundle = _bundle;
        console.log(this.bundle);
        this.products = this.setProducts(_bundle);
        this.initForm();
        this.bundleForm.patchValue(_bundle);
        this.setTotals();   
      });
  }

  private initForm() {
    this.bundleForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      pricePM: [0],
      priceCF: [0]
    });
  }
  private setProducts(_bundle: BundleDto) {
   const dirtyProducts = _bundle.products?.map((product) => product) as ProductDto[];
   return dirtyProducts;
  }
  private setTotals() {
    this.totalCF = this.products.reduce(
      (acc, product) => acc + (product.priceCF || 0),
      0
    );
    this.totalPM = this.products.reduce(
      (acc, product) => acc + (product.pricePM || 0),
      0
    );
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
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
        this.router.navigate(['/bundler/bundles']);
    });
  }
}
