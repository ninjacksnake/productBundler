import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddProductBundleDto } from "../Dtos/add.product.bundle.dto";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartService } from "../shared/services/cart.service";
import { ProductDto } from "../shared/Dtos/product.dto";
import { BundlesService } from "../shared/services/bundles.service";
import { finalize, map, shareReplay, take, tap } from "rxjs";
import { HttpResponse, HttpStatusCode } from "@angular/common/http";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import { Router } from "@angular/router";



interface CartDialogData {
    title: string;
    message: string;
    products: AddProductBundleDto[];
    closeDialog: () => void;
}


const tableColumns: string[] = ['productId', 'name', 'priceCF', 'pricePM', 'quantity', 'options'];

@Component({
    selector: 'app-cart-dialog',
    templateUrl: './cart.dialog.component.html',
    styleUrls: ['./cart.dialog.component.css']
})

export class CartDialogComponent implements OnInit {
    product: ProductDto[] = this.data.products;
    tableColumns = tableColumns;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    bundleForm: FormGroup = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        priceCF: [0, Validators.required],
        pricePM: [0, Validators.required],
        products: [this.data.products]
    });

    @Input() closeDialog! :() => void;

   

    // Injecting data into the dialog component
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: CartDialogData,
        private fb: FormBuilder,
        private cartService: CartService,
        private BundlesService: BundlesService,
        private matSnackBar: MatSnackBar,
        private router: Router,
    ) {}

    onClose(): void {
        if (this.data.closeDialog) {
            this.data.closeDialog();
        }
    }

    ngOnInit(): void {
        //  console.log(this.data.products);
    }

    onSubmit(): void {

        this.bundleForm.value.bundleId = this.bundleForm.value.name;
        this.bundleForm.value.priceCF = this.cartService.getTotalCF();
        this.bundleForm.value.pricePM = this.cartService.getTotalPM();

        if (this.bundleForm.valid) {
            this.BundlesService.create(this.bundleForm.value).subscribe({
                next: (response: HttpResponse<any>) => {
                    this.matSnackBar.open("Combo creado exitosamente", "Cerrar", {
                        verticalPosition: this.verticalPosition,
                        horizontalPosition: this.horizontalPosition,
                        duration: 3000,
                        panelClass: ['mat-toolbar', 'mat-primary'],

                    });

                },
                error: (error: any) => {
                    console.error('Error al crear el combo:', error);
                    this.matSnackBar.open("La creacion del combo fallo, intentelo nuevamente.", "Close", {
                        verticalPosition: this.verticalPosition,
                        horizontalPosition: this.horizontalPosition,
                        duration: 3000,
                        panelClass: ['mat-toolbar', 'mat-warn']
                    });
                },
                complete: () => {
                    //console.log('Bundle creation process completed.');
                    this.cartService.clearCart();
                    this.onClose();
                    this.router.navigate(['/bundler/bundles']);
                    
                }
            })

        } else {
            console.log("Hay campos vacios o no validos.");
        }

    }

    getTotalCF(): number {
        return this.cartService.getTotalCF();
    }

    getTotalPM(): number {
        return this.cartService.getTotalPM();
    }

    removeProduct(theTroduct: ProductDto): void {
        this.cartService.removeFromCart(theTroduct);
    }

   
}
