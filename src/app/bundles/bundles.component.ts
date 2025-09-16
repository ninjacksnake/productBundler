import { Component } from '@angular/core';
import { BundlesService } from '../shared/services/bundles.service';
import { IBundle } from '../shared/Dtos/bundle.dto';
@Component({
  selector: 'app-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.css']
})
export class BundlesComponent {
  bundles:  IBundle[] = [];

  constructor(private bundlesService: BundlesService) {
    this.bundlesService.getAll().subscribe((bundles: IBundle[]) => this.bundles = bundles)  
  }  
  
  
  columns: string[] = ['name', 'description', 'priceCF', 'pricePM', 'options' ];

}
