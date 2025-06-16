import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BundleDto } from '../Dtos/bundle.dto';
                                                    


@Injectable({
  providedIn: 'root'
})
export class BundlesService {

    private bundles: BundleDto[] = [
        {
        id: 1,
        name: 'Bundle 1',
        description: 'Description 1',
        products: [],
        PriceCF: 2000,
        PricePM: 1500,
        createdDate: new Date(),
        updatedDate: new Date()
        },  
        {
        id: 2,
        name: 'Bundle 2',
        description: 'Description 2',
        products: [],
        PriceCF: 2500,
        PricePM: 2000,
        createdDate: new Date(),
        updatedDate: new Date(),
        },
    ];

  private apiUrl = 'https://localhost:5001/api/bundles';

  constructor() { }

  getAll(): BundleDto[]   {
   //return this.http.get<BundleDto[]>(this.apiUrl);
   return this.bundles;
  }

  getById(id: number): BundleDto {
    return this.bundles.find(bundle => bundle.id === id);
  }

  create(bundle: BundleDto):    BundleDto {
    return this.bundles.push(bundle) ;
  }

  update(id: number, bundle: BundleDto): BundleDto {
    return this.bundles.find(bundle => bundle.id === id);
  }

  delete(id: number): void {
    this.bundles = this.bundles.filter(bundle => bundle.id !== id);
  }

}
