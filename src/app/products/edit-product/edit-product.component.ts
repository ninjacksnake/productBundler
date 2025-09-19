import { Component } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { UpdateProductDto } from '../../Dtos/update.product.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
   
  productForm!: FormGroup;
  
  product: UpdateProductDto = {} as UpdateProductDto;
  constructor(private productService: ProductService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar ) { } 

  ngOnInit(): void {
    // Initialize the form with empty values first
    this.initForm();
    
    // Then fetch and update the product data
    this.productService.getProduct(this.route.snapshot.params['id']).subscribe((product: UpdateProductDto) => { 
      this.product = product;
      this.productForm.patchValue({
        id: this.product.id,
        name: this.product.name,
        productId: this.product.productId,
        description: this.product.description,
        pricePM:  this.product.pricePM,
        priceCF: this.product.priceCF,
        image: this.product.image
      });
    });
  }

  private initForm() {
    this.productForm = this.fb.group({
      id: [''],
      name: [''],
      productId: [''],
      description: [''],
      pricePM: [0],
      priceCF: [0],
      image: ['']
    });
   
  }

  onSubmit(): void {
    const result =  this.productService.updateProduct(this.productForm.value).subscribe((product: UpdateProductDto) => {
      this.snackBar.open('Product updated successfully', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.router.navigate(['/bundler/products']);
      });
  }

  onCancel(): void {
   this.router.navigate(['/bundler/products']);
  }
}
