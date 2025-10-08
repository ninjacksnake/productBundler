import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'NavLeft',
  templateUrl: './navLeft.component.html',
  styleUrls: ['./navLeft.component.css'],
})
export class NavLeftComponent {
  //user: IUser  = JSON.parse(localStorage.getItem('loggedUser') || '{}');

  @Input() user: IUser | null = null;

  navItems = [
    { name: 'Combos', path: 'bundles' , permission: ['admin', 'user'] },
    { name: 'Productos', path: 'products' , permission: ['admin', 'user'] },
    { name: 'Usuarios', path: 'users' , permission: ['admin'] },
  ];

  filteredNavItems: any[] = [];
  selectedOption: string = '';

  constructor(private location: Location, private router: Router) {}



  ngOnInit(): void {
    this.selectedOption = this.location.path().split('/')[2];
    this.filterNavItems();
  }
  
  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedOption = this.location.path().split('/')[2];
      }
    });
  }

  getSelectedClass(option: string): string {
    return this.location.path().includes(option.toLowerCase())
      ? 'selected'
      : '';
  }

  validatePermission(item: string[]): boolean {
    //console.log(this.user?.role);
    return item.some(permission => this.user?.role?.toLowerCase().includes(permission));
  }

  filterNavItems(): void {
    this.filteredNavItems = this.navItems.filter(item => this.validatePermission(item.permission));
   // console.log(this.filteredNavItems);
  }
}
