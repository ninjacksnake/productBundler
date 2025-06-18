import { Component } from '@angular/core';
import { AddBundleDto } from '../../Dtos/add.bundle.dto';
import { BundlesService } from '../../shared/services/bundles.service';

@Component({
  selector: 'app-bundle-list',
  templateUrl: './bundle-list.component.html',
  styleUrls: ['./bundle-list.component.css']
})
export class BundleListComponent {

  bundles: AddBundleDto[] = [];

  constructor(private bundlesService: BundlesService) {
    this.bundles = this.bundlesService.getAll()
   

  }      
  columns: string[] = ['name', 'description', 'priceCF', 'pricePM', 'options' ];
}
