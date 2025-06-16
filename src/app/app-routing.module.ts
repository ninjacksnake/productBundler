import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { BundlesComponent } from './bundles/bundles.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
     {
      path: '',
      component: BundlesComponent,
     },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
