import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { catchError, map, Observable, shareReplay, take, tap, throwError } from 'rxjs';
import { IBundle } from '../Dtos/bundle.dto';



@Injectable({
  providedIn: 'root'
})
export class BundlesService {


  public bundles: IBundle[] = [];

  private apiUrl = '/bundles';

  constructor(private http: HttpService) {
  }

  /**
   * Retrieves all bundles from the local data source.
   * 
   * @returns An array of all BundleDto objects.
   */
  getAll(): Observable<IBundle[]> {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => {
        this.bundles = response;
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching bundles:', error);
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  getById(id: number): Observable<IBundle> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching bundle:', error);
        return throwError(() => error);
      })
    );
  }

  create(bundle: IBundle): Observable<any> {
    return this.http.post(this.apiUrl, bundle).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error creating bundle:', error);
        return throwError(() => error);
      })
    );
  }

  update(id: number, bundle: IBundle): Observable<IBundle> {
    return this.http.patch(`${this.apiUrl}/${id}`, bundle).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error updating bundle:', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error deleting bundle:', error);
        return throwError(() => error);
      })
    );
  }

}
