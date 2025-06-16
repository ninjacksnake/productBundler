import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
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
import { CartDialogComponent } from "../cart/cart.dialog.component";    

@NgModule({
    declarations: [HeaderComponent, FooterComponent, ContentComponent, LayoutComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatBadgeModule,
        MatDialogModule,
        MatListModule
    ],
    exports: [LayoutComponent],
})
export class LayoutModule { }