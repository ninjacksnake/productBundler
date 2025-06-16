import { Component } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { AddProductDto } from '../../Dtos/add.product.dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { CartDialogComponent } from '../../cart/cart.dialog.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private cartService: CartService, private dialog: MatDialog) { }

    getCart(): AddProductDto[] {
        return this.cartService.getCart();
    }

    getTotalProducts(): number {
        return this.cartService.getTotalProducts();
    }

    clearCart(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: 'Confirmar',
                message: '¿Estas seguro de que deseas limpiar el carrito?'
            }

        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result)
                this.cartService.clearCart();
            }
        });

    }
    openCart(): void {
        const dialogRef = this.dialog.open(CartDialogComponent, {
            data: {
                title: 'Carrito de compras',
                message: 'Carrito de compras',
                products: this.getCart()
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result)
                this.cartService.clearCart();
            }
        });
    }

}
