import { Component, Input, ViewChild } from '@angular/core';
import { IBundle } from '../../shared/Dtos/bundle.dto';
import { BundlesService } from '../../shared/services/bundles.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BundlePrintService } from '../../shared/services/bundle-print.service';

@Component({
  selector: 'app-bundle-list',
  templateUrl: './bundle-list.component.html',
  styleUrls: ['./bundle-list.component.css']
})
export class BundleListComponent {
  bundles: IBundle[] = [];
  user: any;
  role: any;

  constructor(
    private bundlesService: BundlesService,
    private authService: AuthService,
    private bundlePrintService: BundlePrintService
  ) {
    this.bundlesService.getAll().subscribe((bundles: IBundle[]) => this.bundles = bundles)
    this.user = this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.role = this.user.role || null;
    });
  }

  dataSource = new MatTableDataSource<IBundle>();
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.bundlesService.getAll().subscribe((bundles: IBundle[]) => {
      this.bundles = bundles;
      this.dataSource.data = bundles;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  filterBundles(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    this.dataSource.data = this.bundles.filter(bundle =>
      bundle.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bundle.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    };
  }

  deleteBundle(id: number) {

    this.bundlesService.delete(id)
    this.bundlesService.getAll().subscribe((bundles: IBundle[]) => this.dataSource.data = bundles)
    // this.bundles = this.bundlesService.getAll()
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterBundles();
  }

  printBundle(bundle: IBundle): void {
    this.bundlePrintService.printBundle(bundle);
  }

  columns: string[] = ['name', 'description', 'priceCF', 'pricePM', 'priceDC', 'options'];
}
