import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductsComponent } from './products/products.component';
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
import { CartDialogComponent } from './cart/cart.dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    CartDialogComponent,
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
