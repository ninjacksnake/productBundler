import { Component } from '@angular/core';
import { AddProductDto } from '../../Dtos/add.product.dto';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';   
import { ProductDto } from 'src/app/Dtos/product.dto';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
    product!: ProductDto;
    imgSrc!: string;

    constructor(private productService: ProductService, private route: ActivatedRoute  ) { 
        this.route.params.subscribe(params => {
            this.productService.getProduct(params['id']).subscribe(product => {
               console.log(product);
                this.product = product ;
                this.getImage(this.product?.image ?? '');
            });

        });
    }
    ngAfterViewInit(): void {
        
        
    }

    getImage(imageText: string) {
    
        this.productService.getImage(imageText).subscribe((image: any) => {
           this.imgSrc=URL.createObjectURL(image);
        });
    }   
}
