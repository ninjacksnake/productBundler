import { Component } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { BundleDto } from 'src/app/Dtos/bundle.dto';
import { IBundle } from 'src/app/shared/Dtos/bundle.dto';
import { BundlesService } from 'src/app/shared/services/bundles.service';



@Component({
    selector: 'app-view-bundle',
    templateUrl: './view-bundle.component.html',
    styleUrls: ['./view-bundle.component.css']
})
export class ViewBundleComponent {
    // get the id from the url
    paramId = this.route.snapshot.paramMap.get('id') || 0;
    Bundle: BundleDto = {};

    products: any[] = [];

    columns = ['name', 'priceCF', 'pricePM', 'createdAt', 'quantity'];

    totalCF: number = 0;
    totalPM: number = 0;
    constructor(private bundlesService: BundlesService, private route: ActivatedRoute
    ) {

        // Aquí puedes usar el servicio para obtener los datos del bundle si es necesario
        const data = this.bundlesService.getById(+this.paramId).pipe().subscribe((data: IBundle) => {
            this.Bundle = data as BundleDto;
            this.products = this.Bundle?.products || [];
            console.log(this.products);
            this.totalCF = this.products.reduce((acc, product) => acc + (product.product.priceCF || 0), 0);
            this.totalPM = this.products.reduce((acc, product) => acc + (product.product.pricePM || 0), 0);
            console.log(this.totalCF);
            return data;
        });

    }
    ngOnInit(): void {

    }
}
