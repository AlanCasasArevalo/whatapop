import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BackendUri } from './app-settings';
import { Product } from './product';
import { ProductFilter } from './product-filter';

@Injectable()
export class ProductService {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri) { }


  getProducts(filter: ProductFilter = undefined): Observable<Product[]> {

      let customFilter:string = ""


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pink Path                                                        |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pide al servidor que te retorne los productos ordenados de más   |
    | reciente a menos, teniendo en cuenta su fecha de publicación.    |
    |                                                                  |
    | En la documentación de 'JSON Server' tienes detallado cómo hacer |
    | la ordenación de los datos en tus peticiones, pero te ayudo      |
    | igualmente. La querystring debe tener estos parámetros:          |
    |                                                                  |
    |   _sort=publishedDate&_order=DESC                                |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      let customOrder = `_sort=publishedDate&_order=DESC`
    

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Red Path                                                         |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pide al servidor que te retorne los productos filtrados por      |
    | texto y/ por categoría.                                          |
    |                                                                  |
    | En la documentación de 'JSON Server' tienes detallado cómo       |
    | filtrar datos en tus peticiones, pero te ayudo igualmente. La    |
    | querystring debe tener estos parámetros:                         |
    |                                                                  |
    |   - Búsqueda por texto:                                          |
    |       q=x (siendo x el texto)                                    |
    |   - Búsqueda por categoría:                                      |
    |       category.id=x (siendo x el identificador de la categoría)  |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    // if (filter !== null || filter === "0"){
    if (filter !== null){
      
      if (filter.text){
        customFilter = customFilter.concat(`q=${filter.text}`)     
      }

      if (filter.category !== '0'){
        customFilter = customFilter.concat(`&category.id=${filter.category}`)
      }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Yellow Path                                                      |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pide al servidor que te retorne los productos filtrados por      |
    | estado.                                                          |
    |                                                                  |
    | En la documentación de 'JSON Server' tienes detallado cómo       |
    | filtrar datos en tus peticiones, pero te ayudo igualmente. La    |
    | querystring debe tener estos parámetros:                         |
    |                                                                  |
    |   - Búsqueda por estado:                                         |
    |       state=x (siendo x el estado)                               |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      if(filter.state){
        customFilter = customFilter.concat(`&state=${filter.state}`)
      }

      filter = null

    }
      // http://localhost:3004/products?_sort=publishedDate&_order=DESC&q=uncharted&category.id=1

      // switch (filter.category) {
      //   case "0":
      //     // console.log("Filtro en todos")
      //     // console.log(filter.text)
      //     // console.log(customFilter)
      //     console.log(customFilter)
      //   break;
      //   case "1":
      //     // customFilter = customFilter.concat(`q=${ filter.category }`)
      //     // console.log(customFilter)
      //     // console.log("VideoJuegos")
      //     // console.log(filter.text)
      //   break;
      //   case "2":
      //     console.log("Peliculas")
      //     console.log(filter.text)
      //   break;
      //   case "3":
      //     console.log("Libros")
      //     console.log(filter.text)
      //   break;
      //   default:
      //     break;
      // }
      // console.log(`${this._backendUri}/products?${customFilter}&${customOrder}`)














    return this._http
      // .get(`${this._backendUri}/products?${customOrder}&${customFilter}`)
      .get(`${this._backendUri}/products?${customFilter}&${customOrder}`)
      .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
  }

  getAllSoldProductsToReset(customFilter: ProductFilter):Observable<Product[]> {

    return this._http.get(`${this._backendUri}/products?state=${customFilter.state}`)
                     .map( (data: Response):Product[] => Product.fromJsonToList(data.json()) )

  }

  getProduct(productId: number): Observable<Product> {
    return this._http
      .get(`${this._backendUri}/products/${productId}`)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  buyProduct(productId: number): Observable<Product> {
    const body: any = { 'state': 'sold' };
    console.log(`${this._backendUri}/products/${productId}`, body)
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  setProductAvailable(productId: number): Observable<Product> {
    const body: any = { 'state': 'selling' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

}
