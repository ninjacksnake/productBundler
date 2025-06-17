import { Component } from '@angular/core';
import { AddBundleDto } from '../Dtos/add.bundle.dto';
import { BundlesService } from '../shared/services/bundles.service';

@Component({
  selector: 'app-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.css']
})
export class BundlesComponent {
  bundles: AddBundleDto[] = [];

  constructor(private bundlesService: BundlesService) {
    this.bundles = this.bundlesService.getAll()
   

  }      
  columns: string[] = ['name', 'description', 'priceCF', 'pricePM', 'options' ];

}
