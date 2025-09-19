import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { UsersComponent } from './users/users.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list'; 
import { LayoutModule } from './layout/layout.module';
import { BundlesComponent } from './bundles/bundles.component';
import { DialogComponent } from './shared/dialog/dialog.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddBundleComponent } from './bundles/add-bundle/add.bundle.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { ViewBundleComponent } from './bundles/view-bundle/view-bundle.component';
import { ViewUserComponent } from './users/view-user/view-user.component';  
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { NavLeftComponent } from './layout/app-header/components/nav-left/navLeft.component';
import { EditBundleComponent } from './bundles/edit-bundle/edit-bundle.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { BundleListComponent } from './bundles/bundle-list/bundle-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserConfigurationComponent } from './users/user-configuration/user-configuration.component';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { LogInComponent } from './log-in/log-in.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';  
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 import{MatPaginatorModule}from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge'; 

/** 
 * The root module of the application. 
 * 
 * This module is responsible for importing the necessary modules and declaring the application components.
 * 
 * It also provides the services required by the application components.
 * 
 * Finally, it specifies the component that will be used as the bootstrap component, which is the component 
 * that will be rendered when the application is started.
 */
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    UsersComponent,
    BundlesComponent,
    DialogComponent,

    AddUserComponent,
    AddBundleComponent,
    AddProductComponent,
    ViewProductComponent,
    ViewBundleComponent,
    ViewUserComponent,
    EditUserComponent,
    EditBundleComponent,
    EditProductComponent,
    BundleListComponent,
    ProductListComponent,
    UsersListComponent,
    UserProfileComponent,
    UserConfigurationComponent,
    LogInComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    LayoutModule,
    MatTableModule,
    MatAutocompleteModule,  
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,  
    MatInputModule,
    MatSelectModule,
    MatOptionModule,  
    MatToolbarModule,  
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatStepperModule,
    MatBadgeModule,
    
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
