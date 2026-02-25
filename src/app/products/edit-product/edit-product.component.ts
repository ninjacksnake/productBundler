import { Component } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { UpdateProductDto } from '../../Dtos/update.product.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, switchMap, map, catchError } from 'rxjs';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  imageData: { file: File } | null = null;
  imagePreview: string | null = null;
  id: string = this.route.snapshot.params['id'];

  productForm!: FormGroup;

  product: UpdateProductDto = {} as UpdateProductDto;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  // Initialize the form
  private initForm() {
    this.productForm = this.fb.group({
      id: [this.id],
      name: [''],
      productId: [''],
      description: [''],
      pricePM: [0],
      priceCF: [0],
      priceDC: [0],
      image: [''],
      manualDoc: [''],
      imageData: [null],
    });
  }

  ngOnInit(): void {
    // Initialize the form with empty values first
    this.initForm();

    // Then fetch and update the product data
    this.productService
      .getProduct(this.id)
      .subscribe((product: UpdateProductDto) => {
        console.log(product);
        this.product = product;
        this.productForm.patchValue({
          id: this.product.id,
          name: this.product.name,
          productId: this.product.productId,
          description: this.product.description,
          pricePM: this.product.pricePM,
          priceCF: this.product.priceCF,
          priceDC: this.product.priceDC,
          manualDoc: this.product.manualDoc,
          image: this.product.image || '',
          imageData: this.product.imageData,
        });
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('process file')
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
    this.productService.updateProduct(this.productForm.value).pipe(
      switchMap((res) => {
        console.log('Product updated successfully:', res);
        const file = (this.productForm.value.imageData as { file: File })?.file;
        if (file) {
          return this.productService.addImage(this.id, this.productForm.value.productId, file).pipe(
            map(() => ({ type: 'success', message: 'Product and image updated successfully', id: this.id })),
            catchError((err: any) => {
              console.error('Image upload failed', err);
              return of({ type: 'warning', message: 'Product updated, but image upload failed', id: this.id });
            })
          );
        } else {
          return of({ type: 'success', message: 'Product updated successfully', id: this.id });
        }
      })
    ).subscribe({
      next: (result: any) => {
        this.snackBar.open(result.message, 'Close', {
          duration: result.type === 'success' ? 2000 : 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: result.type === 'success' ? ['mat-snackbar-success'] : ['mat-snackbar-warning']
        });
        this.router.navigate(['/bundler/products/view/' + this.id]);
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.snackBar.open('Error updating product', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-error']
        });
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/bundler/products']);
  }
}
