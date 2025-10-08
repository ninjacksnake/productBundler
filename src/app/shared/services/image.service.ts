import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpService) {}

  uploadProductImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post('/api/upload', formData);
  }

  getProductImage(productId: string): Observable<any> {
    return this.http.get('/api/products/' + productId + '/image');
  }

  getUserImage(userId: string): Observable<any> {
    return this.http.get('/api/users/' + userId + '/image');
  }

  uploadUserImage(userId: string, image: File): Observable<any> {
   // console.log(userId, image);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('UserId', userId);
    return this.http.post('/user/save-image', formData).pipe(
      map((response: any) => {
       // console.log('Image saved successfully:', response);
        return response;
      }),
      catchError(this.handleError('addImage'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
