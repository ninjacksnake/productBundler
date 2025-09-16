import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { AddProductDto } from '../../Dtos/add.product.dto';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
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
      priceCF: ['', [Validators.required, Validators.min(0)]]
    });

    // Subscribe to form value changes for debugging
    this.productForm.valueChanges.subscribe(value => {
      console.log('Form values changed:', value);
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: AddProductDto = {
        productId: this.productForm.value.productId,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        pricePM: parseFloat(this.productForm.value.pricePM),
        priceCF: parseFloat(this.productForm.value.priceCF)
      };

      this.productService.addProduct(product).subscribe(() => {
        console.log('Product added successfully', product);
      }); 
      
      // this.cartService.addToCart(product);
      // this.productForm.reset();
    } else {
      console.log('Form is invalid');
      Object.values(this.productForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
