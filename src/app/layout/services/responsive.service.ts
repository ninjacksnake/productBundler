import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: "root",
})

export class ResponsiveService {
  private isMobileView = new BehaviorSubject<boolean>(false);
  isMobileView$ = this.isMobileView.asObservable(); // Observable para el estado de vista móvil

  checkScreenSize() {
    this.isMobileView.next(window.innerWidth <= 768); // Cambia a true si el ancho de la pantalla es menor o igual a 768px
  }
}