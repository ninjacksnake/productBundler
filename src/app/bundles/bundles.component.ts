import { Component } from '@angular/core';
import { BundlesService } from '../shared/services/bundles.service';
import { IBundle } from '../shared/Dtos/bundle.dto';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.css']
})
export class BundlesComponent {
  bundles:  IBundle[] = [];
  user: any;
  role: any;

  constructor(private bundlesService: BundlesService, private authService: AuthService) {
    this.bundlesService.getAll().subscribe((bundles: IBundle[]) => this.bundles = bundles)  
    this.user = this.authService.getCurrentUser() || {};
    this.role = this.user.role || null;
  }  
  
  
  columns: string[] = ['name', 'description', 'priceCF', 'pricePM', 'options' ];

}
