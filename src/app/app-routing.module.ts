import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { AddBundleComponent } from './bundles/add-bundle/add.bundle.component';
import { BundlesComponent } from './bundles/bundles.component';
import { EditBundleComponent } from './bundles/edit-bundle/edit-bundle.component';
import { ViewBundleComponent } from './bundles/view-bundle/view-bundle.component';
import { BundleListComponent } from './bundles/bundle-list/bundle-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ViewProductComponent } from './products/view-product/view-product.component';

const routes: Routes = [
  { 
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'bundles',
        component: BundlesComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: BundleListComponent,
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddBundleComponent,
            pathMatch: 'full'
          },
          {
            path: 'edit/:id',
            component: EditBundleComponent,
          },
          {
            path: 'view/:id',
            component: ViewBundleComponent,
          },
        ]
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: UsersListComponent,
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddUserComponent,
            pathMatch: 'full'
          },
          {
            path: 'edit/:id',
            component: EditUserComponent,
          },
          {
            path: 'view/:id',
            component: ViewUserComponent,
          },  
        ]    
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          { 
            path: 'list',
            component: ProductListComponent,
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddProductComponent,
            pathMatch: 'full'
          },
          {
            path: 'edit/:id',
            component: EditProductComponent,
          },
          {
            path: 'view/:id',
            component: ViewProductComponent,
          },  
        ]    
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
