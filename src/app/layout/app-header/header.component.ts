import { Component   } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { AddProductDto } from '../../Dtos/add.product.dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { CartDialogComponent } from '../../cart/cart.dialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
    user: IUser | null = null;
   
    
    constructor(
        private cartService: CartService,
         private dialog: MatDialog,
          private authService: AuthService, 
          private snackBar: MatSnackBar
    ) { }
    
   
    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe((user) => {
            this.user = user;
        });
    }
    

    
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
              //  console.log(result)
                this.cartService.clearCart();
            }
        });

    }
    openCart(): void {
        if ( this.cartService.getCart().length === 0 ) {
            this.snackBar.open('El carrito esta vacio', 'Cerrar', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
            });
            return;
        }
        const dialogRef = this.dialog.open(CartDialogComponent, {

            data: {
                title: 'Paleta de Combos',
                message: 'Paleta de Combos',
                products: this.getCart(),
                closeDialog: () => dialogRef.close()
            }

        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                //console.log(result)
                this.cartService.clearCart();
            }
        });
    }
    logout(): void {
        this.authService.logout();
    }

}
