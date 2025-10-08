import { Component, ViewChild } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { BundleDto } from 'src/app/Dtos/bundle.dto';
import { IBundle } from 'src/app/shared/Dtos/bundle.dto';
import { BundlesService } from 'src/app/shared/services/bundles.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
    selector: 'app-view-bundle',
    templateUrl: './view-bundle.component.html',
    styleUrls: ['./view-bundle.component.css']
})
export class ViewBundleComponent {
    pageSize = 5;
    pageSizeOptions = [5, 10, 25];
    dataSource!: MatTableDataSource<any>;
    // get the id from the url
    paramId = this.route.snapshot.paramMap.get('id') || 0;
    Bundle: BundleDto = {};
    images: any[] = [];
    products: any[] = [];
    
    columns = ['name', 'priceCF', 'pricePM', 'createdAt', 'quantity'];
    
    totalCF: number = 0;
    totalPM: number = 0;
    constructor(private bundlesService: BundlesService, private route: ActivatedRoute, private productService: ProductService, private router: Router
    ) {
        
        // Aquí puedes usar el servicio para obtener los datos del bundle si es necesario
        this.bundlesService.getById(+this.paramId).subscribe((data: IBundle) => {
            this.Bundle = data as BundleDto;
           // console.log(this.Bundle.products);
            this.products = this.Bundle?.products || [];
            this.products.forEach(product => this.getImage(product.product.image));
            this.totalCF = this.products.reduce((acc, product) => acc + (product.product.priceCF || 0), 0);
            this.totalPM = this.products.reduce((acc, product) => acc + (product.product.pricePM || 0), 0);
            this.dataSource = new MatTableDataSource(this.products);
        });
        
    }
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    async getImage(fileName: string) {
       // console.log(fileName);
        await this.productService.getImage(fileName).subscribe((data: any) => {
            this.images.push(URL.createObjectURL(data));
        });
    }

    back() {
        this.router.navigate(['/bundler/bundles']);
    }

    edit() {
        this.router.navigate(['/bundler/bundles/edit/', this.paramId]);
    }
}
