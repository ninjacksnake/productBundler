import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { AddProductDto } from '../../Dtos/add.product.dto';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})

export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      productId: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      pricePM: ['', [Validators.required, Validators.min(0)]],
      priceCF: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      imageData: [{file: null}],
    });

    // Subscribe to form value changes for debugging
    this.productForm.valueChanges.subscribe((value) => {
      //console.log('Form values changed:', value);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file.name);
    this.productForm.patchValue({
      image: file.name,
      imageData: {file: file},
    });
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

      this.productService
        .addProduct(product)
        .pipe(
          switchMap((created: any) => {
            // If addProduct failed (service handles error by returning undefined), do not upload image
            if (!created) {
              return of(null);
            }
            const file = (this.productForm.value.imageData as { file: File })?.file;
            if (!file) {
              return of(null);
            }
            return this.productService.addImage(this.productForm.value.productId, file);
          })
        )
        .subscribe({
          next: (res) => {
            console.log('Product created. Image uploaded only if present and product creation succeeded.', res);
          },
          error: (err) => {
            console.error('Error creating product or uploading image:', err);
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
