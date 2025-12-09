import { Component } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { UpdateProductDto } from '../../Dtos/update.product.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, switchMap } from 'rxjs';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  imageData: { file: File } | null = null;
  imagePreview: string | null = null;

  productForm!: FormGroup;

  product: UpdateProductDto = {} as UpdateProductDto;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Initialize the form with empty values first
    this.initForm();

    // Then fetch and update the product data
    this.productService
      .getProduct(this.route.snapshot.params['id'])
      .subscribe((product: UpdateProductDto) => {
        this.product = product;
        this.productForm.patchValue({
          id: this.product.id,
          name: this.product.name,
          productId: this.product.productId,
          description: this.product.description,
          pricePM: this.product.pricePM,
          priceCF: this.product.priceCF,
          image: this.product.image,
          imageData: this.product.imageData,
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
      image: [''],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  processFile(file: File) {
    this.productForm.patchValue({
      image: file.name,
      imageData: { file: file },
    });

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage(event: Event) {
    event.stopPropagation();
    this.imagePreview = null;
    this.productForm.patchValue({
      image: '',
      imageData: { file: null },
    });
  }

  onSubmit() {
    this.productService
      .updateProduct(this.productForm.value)
      .subscribe({
        next: (res) => {
          //console.log('Product updated successfully:', res);
          this.snackBar.open('Product updated successfully', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          const file = (this.productForm.value.imageData as { file: File })?.file;
          if (file) {
            this.productService.addImage(res.id, this.productForm.value.productId, file);
          }
          this.router.navigate(['/bundler/products/view/' + res.id]);
        },
        error: (err) => {
          console.error('Error updating product:', err);
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/bundler/products']);
  }
}
