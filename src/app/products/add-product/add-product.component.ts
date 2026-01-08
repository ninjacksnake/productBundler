import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { AddProductDto } from '../../Dtos/add.product.dto';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  imagePreview: string | null = null;
  isDragOver: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productId: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      pricePM: ['', [Validators.required, Validators.min(0)]],
      priceCF: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      imageData: [{ file: null }],
    });

    // Subscribe to form value changes for debugging
    this.productForm.valueChanges.subscribe((value) => {
      //console.log('Form values changed:', value);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  processFile(file: File) {
    console.log(file.name);
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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        this.processFile(file);
      } else {
        this.snackBar.open('Por favor selecciona un archivo de imagen válido', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['mat-snackbar-error']
        });
      }
    }
  }

  removeImage(event: Event) {
    event.stopPropagation();
    this.imagePreview = null;
    this.productForm.patchValue({
      image: '',
      imageData: { file: null },
    });
  }

  onCancel() {
    this.router.navigate(['/bundler/products']);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: AddProductDto = {
        productId: this.productForm.value.productId,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        pricePM: parseFloat(this.productForm.value.pricePM),
        priceCF: parseFloat(this.productForm.value.priceCF),
        image: this.productForm.value.image,
        imageData: this.productForm.value.imageData,
      };

      this.productService.addProduct(product).pipe(
        switchMap((response: any) => {
          // Product created successfully
          const file = (this.productForm.value.imageData as { file: File })?.file;

          if (file) {
            // Upload image if file exists
            return this.productService.addImage(response.id, this.productForm.value.productId, file).pipe(
              map(() => ({ type: 'success', message: 'Producto creado exitosamente' })),
              catchError((err) => {
                console.error('Image upload failed', err);
                return of({ type: 'warning', message: 'Producto creado, pero la imagen no se pudo subir' });
              })
            );
          } else {
            // Product created without image
            return of({ type: 'success', message: 'Producto creado exitosamente' });
          }
        })
      ).subscribe({
        next: (result) => {
          this.snackBar.open(result.message, 'Cerrar', {
            duration: result.type === 'success' ? 3000 : 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: result.type === 'success' ? ['mat-snackbar-success'] : ['mat-snackbar-warning']
          });
          this.router.navigate(['/bundler/products']);
        },
        error: (err) => {
          // Product creation failed
          console.error('Error creating product:', err);
          this.snackBar.open('Error al crear el producto. Por favor, intenta de nuevo.', 'Cerrar', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['mat-snackbar-error']
          });
        },
      });

      // this.productForm.reset();
    } else {
      console.log('Form is invalid');
      Object.values(this.productForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
