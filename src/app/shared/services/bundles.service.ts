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
        priceCF: 2000,
        pricePM: 1500,
        createdDate: new Date(),
        updatedDate: new Date()
        },  
        {
        id: 2,
        name: 'Bundle 2',
        description: 'Description 2',
        products: [],
        priceCF: 2500,
        pricePM: 2000,
        createdDate: new Date(),
        updatedDate: new Date(),
        },
    ];

  private apiUrl = 'https://localhost:5001/api/bundles';

  constructor() { }

  /**
   * Retrieves all bundles from the local data source.
   * 
   * @returns An array of all BundleDto objects.
   */
  getAll(): BundleDto[]   {
   //return this.http.get<BundleDto[]>(this.apiUrl);
   return this.bundles;
  }

  getById(id: number): BundleDto {
    const bundle = this.bundles.find(bundle => bundle.id === id);
    if (!bundle) {
      throw new Error('Bundle not found');
    }
    return bundle;
  }

  create(bundle: BundleDto):    BundleDto {
    this.bundles.push(bundle) ;
    return bundle;
  }

  update(id: number, bundle: BundleDto): BundleDto {
    const index = this.bundles.findIndex(bundle => bundle.id === id);
    this.bundles[index] = bundle;
    return bundle;
  }

  delete(id: number): void {
    this.bundles = this.bundles.filter(bundle => bundle.id !== id);
  }

}
