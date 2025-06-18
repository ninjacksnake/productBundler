import { Component } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { AddProductDto } from '../Dtos/add.product.dto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DialogComponent } from '../shared/dialog/dialog.component';



interface CartDialogData {
  title: string;
  message: string;
  products: AddProductDto[];
}


  /**
   * Store a copy of the cart in the web browser localstorage
   */
  const storeCartLocally = (data: CartDialogData): void => {
    localStorage.setItem('cart', JSON.stringify(data.products));
  }

  const getCartLocally = (): AddProductDto[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

@Component({
  selector: 'app-cart',
  templateUrl: './cart.dialog.component.html',
  styleUrls: ['./cart.dialog.component.css']
})



export class CartDialogComponent {
  constructor(private cartService: CartService,
    private dialogRef: MatDialogRef<CartDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: CartDialogData) { }

  getCart(): AddProductDto[] {
    return getCartLocally();
  }

  getTotalCF(): number {
    return this.cartService.getTotalCF();
  }

  getTotalPM(): number {
    return this.cartService.getTotalPM();
  }

  closeCart(): void {
    this.dialogRef.close();
  }

  clearCart(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirmar',
        message: '¿Estas seguro de que deseas limpiar la lista?',
        products: [] // Empty array since we're clearing the cart
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartService.clearCart();
        this.dialogRef.close();
      }
    });
  }

  createBundle(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirmar',
        message: '¿Estas seguro de que deseas crear el combo?'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartService.createBundle() ;
        this.dialogRef.close();
      }
    });
  }



}
