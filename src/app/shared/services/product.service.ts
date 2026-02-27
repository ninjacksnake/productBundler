import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AddProductDto } from '../../Dtos/add.product.dto';
import { HttpService } from '../../shared/http.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { UpdateProductDto } from 'src/app/Dtos/update.product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpService) { }

  addProduct(product: AddProductDto): Observable<any> {
    // Ensure we're sending the correct DTO structure
    const productDto: AddProductDto = {
      productId: product.productId,
      name: product.name,
      description: product.description,
      pricePM: product.pricePM,
      priceCF: product.priceCF,
      priceDC: product.priceDC,
      image: product.image
    };

    return this.http.post('/products', productDto).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError('addProduct'))
    );
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get('/products').pipe(
      map((response: any) => {
        // Transform the response to match AddProductDto
        return response.map((product: IProduct) => ({
          id: product.id,
          productId: product.productId,
          name: product.name,
          description: product.description,
          pricePM: product.pricePM,
          priceCF: product.priceCF,
          priceDC: product.priceDC,
          manualDoc: product.manualDoc,
          stock: product.stock,
          image: product.image,
        }));
      }),
      catchError(this.handleError('getProducts', []))
    );
  }

  getProduct(id: string): Observable<IProduct> {
    return this.http.get(`/products/${id}`).pipe(
      map((response: any) => {
        const product: IProduct = {
          id: response.id,
          productId: response.productId,
          name: response.name,
          description: response.description,
          pricePM: response.pricePM,
          priceCF: response.priceCF,
          priceDC: response.priceDC,
          manualDoc: response.manualDoc,
          stock: response.stock,
          image: response.image,
        };
        return product;
      }),
      catchError(
        this.handleError<IProduct>(`getProduct id=${id}`, {
          id: 0,
          productId: '',
          name: '',
          description: '',
          pricePM: 0,
          priceCF: 0,
          priceDC: 0,
          manualDoc: '',
          stock: 0,
          image: '',
        })
      )
    );
  }

  getProductByName(name: string): Observable<IProduct[]> {
    //console.log(`getProductByName name=${name}`);
    return this.http.get(`/products/?name=${name}`).pipe(
      map((response: any) => {
        //   console.log(`fetched product name=${name}`);
        const product: IProduct[] = response.map((product: IProduct) => ({
          id: product.id,
          productId: product.productId,
          name: product.name,
          description: product.description,
          pricePM: product.pricePM,
          priceCF: product.priceCF,
          priceDC: product.priceDC,
          manualDoc: product.manualDoc,
          stock: product.stock,
          image: product.image,
        }));
        return product;
      }),
      catchError(
        this.handleError<IProduct[]>(`getProductByName name=${name}`, [])
      )
    );
  }

  getProductsByProductId(productId: string): Observable<IProduct[]> {
    return this.http.get(`/products/?productId=${productId}`).pipe(
      map((response: any) => {
        //     console.log(`fetched products productId=${productId}`);
        const products: IProduct[] = response.map((product: IProduct) => ({
          id: product.id,
          productId: product.productId,
          name: product.name,
          description: product.description,
          pricePM: product.pricePM,
          priceCF: product.priceCF,
          priceDC: product.priceDC,
          stock: product.stock,
        }));
        return products;
      }),
      catchError(
        this.handleError<IProduct[]>(`getProductsByProductId productId=${productId}`, [])
      )
    );
  }



  updateProduct(product: UpdateProductDto): Observable<any> {
    return this.http.put(`/products/${product.id}`, product).pipe(
      map((response: any) => {
        // console.log('Product updated successfully:', response);
        return response;
      }),
      catchError(this.handleError<IProduct>('updateProduct'))
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`/products/${id}`).pipe(
      map((response: any) => {
        //     console.log('Product deleted successfully:', response);
        return response;
      }),
      catchError(this.handleError<IProduct>('deleteProduct'))
    );
  }



  addImage(id: string, productId: string, image: File): Observable<any> {

    const formData = new FormData();
    formData.append('image', image);
    formData.append('productId', productId);
    // formData.append('id', id);
    return this.http.post('/products/save-product-image', formData).pipe(
      map((response: any) => {
        // console.log('Image saved successfully:', response);
        return response;
      }),
      catchError(this.handleError('addImage'))
    );
  }

  addDocument(id: string, productId: string, document: File): Observable<any> {
    const formData = new FormData();
    formData.append('document', document);
    formData.append('productId', productId);
    return this.http.post('/products/save-product-document', formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError('addDocument'))
    );
  }

  getImage(fileName: string): Observable<Blob> {
    const safeName = encodeURIComponent(fileName);
    return this.http.get(`/products/image/${safeName}`, { responseType: 'blob' }) as Observable<Blob>;
  }

  getDocument(fileName: string): Observable<Blob> {
    const safeName = encodeURIComponent(fileName);
    return this.http.get(`/products/documents/${safeName}`, { responseType: 'blob' }) as Observable<Blob>;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //  console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
