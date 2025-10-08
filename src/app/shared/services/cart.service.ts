import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddProductBundleDto } from 'src/app/Dtos/add.product.bundle.dto';
import { AddProductDto } from 'src/app/Dtos/add.product.dto';


@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartSubject = new BehaviorSubject<AddProductBundleDto[]>([]); 
    cart$ = this.cartSubject.asObservable();

    constructor() {
        // Initialize cart from localStorage if available
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (Array.isArray(parsedCart)) {
                this.cartSubject.next(parsedCart);
            }
        }
    }

    addToCart(product: AddProductBundleDto): void {
        const cart = this.cartSubject.getValue();
        const productInCart = cart.find((item) => item.productId === product.productId);
        
        if (productInCart) {
            productInCart.quantity = (productInCart.quantity || 0) + 1;
            productInCart.subtotal1 = (productInCart.quantity) * (product.pricePM || 0);
            productInCart.subtotal2 = (productInCart.quantity) * (product.priceCF || 0);
        } else {
            product.quantity = 1;
            product.subtotal1 = product.pricePM || 0;
            product.subtotal2 = product.priceCF || 0;
            cart.push(product);
        }
        
        this.cartSubject.next(cart);
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    removeFromCart(product: AddProductBundleDto): void {
        const cart = this.cartSubject.getValue();
        const updatedCart = cart.filter((item: AddProductBundleDto) => item.productId !== product.productId);
        this.cartSubject.next(updatedCart);
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    getCart(): AddProductBundleDto[] {
        const cart = this.cartSubject.getValue();
        return [...cart]; // Return a copy to prevent direct modification
    }

    clearCart(): void {
        this.cartSubject.next([]);
        // Clear localStorage
        localStorage.removeItem('cart');
    }   

    getTotalProducts(): number {
        return this.cartSubject.getValue().reduce((total, product) => total + (product.quantity || 0), 0);
    }

    getTotalCF(): number {
        return this.cartSubject.getValue().reduce((total, product) => total + (product.subtotal2 || 0), 0);
    }

    getTotalPM(): number {
        return this.cartSubject.getValue().reduce((total, product) => total + (product.subtotal1 || 0), 0);
    }

    createBundle(): void {
        const cart = this.cartSubject.getValue();
        
     //   console.log('Creating bundle with:', cart);
        //limpiar carrito
        this.clearCart();
    }
}