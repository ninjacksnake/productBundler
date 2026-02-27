import { Component } from '@angular/core';
import { AddProductDto } from '../../Dtos/add.product.dto';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from 'src/app/Dtos/product.dto';
import { Router } from '@angular/router';
@Component({
    selector: 'app-view-product',
    templateUrl: './view-product.component.html',
    styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
    product!: ProductDto;
    imgSrc!: string;

    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
            this.productService.getProduct(params['id']).subscribe(product => {
                //console.log(product);
                this.product = product;
                this.getImage(this.product?.image ?? '');
            });

        });
    }
    ngAfterViewInit(): void {


    }

    editProduct() {
        this.router.navigate(['/bundler/products/edit/', this.product.id]);
    }
    getImage(imageText: string) {

        this.productService.getImage(imageText).subscribe((image: any) => {
            this.imgSrc = URL.createObjectURL(image);
        });
    }

    printDocument() {
        if (this.product && this.product.manualDoc) {
            this.productService.getDocument(this.product.manualDoc).subscribe((blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                // You can also force download by setting download attribute
                // link.download = this.product.manualDoc!;
                link.click();
                setTimeout(() => window.URL.revokeObjectURL(url), 100);
            });
        }
    }
}
