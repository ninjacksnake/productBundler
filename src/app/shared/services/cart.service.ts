import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddProductDto } from 'src/app/Dtos/add.product.dto';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartSubject = new BehaviorSubject<AddProductDto[]>([]); 
    cart$ = this.cartSubject.asObservable();

    addToCart(product: AddProductDto): void {
        const cart = this.cartSubject.getValue();
        const productInCart = cart.find((item) => item.productId === product.productId);
        if (productInCart) {
            productInCart.quantity = (productInCart.quantity || 0)+ 1;  
            productInCart.subtotal = (productInCart.quantity) * (product.price1 )|| 0;
            productInCart.subtotal2 = (productInCart.quantity) * (product.price2 ? product.price2 : 0)|| 0;
        } else {
            product.quantity = 1;
            product.subtotal = product.price1 || 0;
            product.subtotal2 = product.price2 ? product.price2 : 0|| 0;
            cart.push(product);
        }
        console.log(cart);
        this.cartSubject.next(cart);
    }

    removeFromCart(product: AddProductDto): void {
        const cart = this.cartSubject.getValue();
        cart.filter((item) => item.productId !== product.productId);
        console.log(cart);
        this.cartSubject.next(cart);
    }

    getCart(): AddProductDto[] {
        return this.cartSubject.getValue();
    }
    clearCart(): void {
        this.cartSubject.next([]);
    }   
    
    getTotalProducts(): number {
       return this.cartSubject.getValue().reduce((total, product) => total + (product.quantity || 0), 0);   
    }

    getTotalCF(): number {
        return this.cartSubject.getValue().reduce((total, product) => total + (product.subtotal || 0), 0);
    }   

    getTotalPM(): number {
        return this.cartSubject.getValue().reduce((total, product) => total + (product.subtotal2 || 0), 0);
    }   

    createBundle(): void {   
        console.log(this.cartSubject.getValue());
        //limpiar carrito
        this.clearCart();
    }
}
    