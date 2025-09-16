import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './app-header/header.component';
import { FooterComponent } from './app-footer/footer.component';
import { ContentComponent } from './app-content/content.component';
import { LayoutComponent } from "./layout.component";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatBadgeModule } from "@angular/material/badge";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartDialogComponent } from "../cart/cart.dialog.component";
import { MatTableModule } from "@angular/material/table";    
import {  MatPaginatorModule } from "@angular/material/paginator";
import { NavLeftComponent } from "./app-header/components/nav-left/navLeft.component";

@NgModule({
    declarations: [HeaderComponent, FooterComponent, ContentComponent, LayoutComponent, CartDialogComponent,NavLeftComponent],
    imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatBadgeModule,
    MatDialogModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
],
    exports: [LayoutComponent],
})
export class LayoutModule { }