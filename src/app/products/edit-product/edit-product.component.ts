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
  documentData: { file: File } | null = null;
  documentPreview: string | null = null;
  id: string = this.route.snapshot.params['id'];
  isDragOverImage: boolean = false;
  isDragOverDocument: boolean = false;
  private readonly IMAGES_BASE_URL = 'http://192.168.10.203/api/v1/products/images/';
  private readonly DOCS_BASE_URL = 'http://192.168.10.203/api/v1/products/documents/';
  // private readonly IMAGES_BASE_URL = 'http://localhost:3000/api/v1/products/image/';
  // private readonly DOCS_BASE_URL = 'http://localhost:3000/api/v1/products/documents/';


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
    this.initForm();
    this.productService.getProduct(this.id).subscribe((product: UpdateProductDto) => {
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
      });

      if (this.product.image) {
        this.imagePreview = this.product.image.startsWith('http')
          ? this.product.image
          : `${this.IMAGES_BASE_URL}${this.product.image}`;
      }
      if (this.product.manualDoc) {
        this.documentPreview = this.product.manualDoc.startsWith('http')
          ? this.product.manualDoc
          : `${this.DOCS_BASE_URL}${this.product.manualDoc}`;
      }
    });
  }

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
      documentData: [null],
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

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onDocumentSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.processDocument(file);
    }
  }

  processDocument(file: File) {
    this.productForm.patchValue({
      manualDoc: file.name,
      documentData: { file: file },
    });

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.documentPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onImageError() {
    this.imagePreview = null;
    this.snackBar.open('No se pudo cargar la imagen del producto', 'Cerrar', {
      duration: 3000,
      panelClass: ['mat-snackbar-warning']
    });
  }

  onDragOver(event: DragEvent, type: 'image' | 'document') {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'image') this.isDragOverImage = true;
    else this.isDragOverDocument = true;
  }

  onDragLeave(event: DragEvent, type: 'image' | 'document') {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'image') this.isDragOverImage = false;
    else this.isDragOverDocument = false;
  }

  onDrop(event: DragEvent, type: 'image' | 'document') {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOverImage = false;
    this.isDragOverDocument = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (type === 'image' && file.type.startsWith('image/')) {
        this.processFile(file);
      } else if (type === 'document' && (file.type.includes('pdf') || file.type.includes('word') || file.name.match(/\.(pdf|doc|docx)$/i))) {
        this.processDocument(file);
      } else {
        this.snackBar.open('Tipo de archivo no válido', 'Cerrar', {
          duration: 3000,
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

  removeDocument(event: Event) {
    event.stopPropagation();
    this.documentPreview = null;
    this.productForm.patchValue({
      manualDoc: '',
      documentData: { file: null },
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productDto: UpdateProductDto = {
        ...this.productForm.value,
        pricePM: parseFloat(this.productForm.value.pricePM),
        priceCF: parseFloat(this.productForm.value.priceCF),
        priceDC: parseFloat(this.productForm.value.priceDC),
      };

      this.productService.updateProduct(productDto).pipe(
        switchMap(() => {
          const imageFile = (this.productForm.get('imageData')?.value as { file: File })?.file;
          const docFile = (this.productForm.get('documentData')?.value as { file: File })?.file;

          let finalObs = of(null);

          if (imageFile) {
            finalObs = this.productService.addImage(this.id, productDto.productId!, imageFile);
          }

          if (docFile) {
            const docObs = this.productService.addDocument(this.id, productDto.productId!, docFile);
            finalObs = finalObs.pipe(switchMap(() => docObs));
          }

          return finalObs.pipe(
            map(() => ({ success: true })),
            catchError(() => of({ success: false, partial: true }))
          );
        })
      ).subscribe({
        next: (res: any) => {
          const message = res.success ? 'Producto actualizado exitosamente' : 'Producto actualizado, pero hubo errores en la carga de archivos';
          this.snackBar.open(message, 'Cerrar', { duration: 3000 });
          this.router.navigate(['/bundler/products']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.snackBar.open('Error al actualizar el producto', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/bundler/products']);
  }
}
