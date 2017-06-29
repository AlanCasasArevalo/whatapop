import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProductService } from './product.service';
import { Product } from './product';
import { ProductFilter } from './product-filter';


@Injectable()
export class SoldProductsResolveService implements Resolve<Product[]> {
  
  constructor( private _productService: ProductService){

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {

    let customFilter: ProductFilter = {
      state : "sold"
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Yellow Path                                                      |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Aquí toca hacer varias cosas:                                    |
    |                                                                  |
    | 1. Necesitamos obtener aquellos productos que están vendidos; es |
    |    decir, aquellos cuyo 'state' es 'sold'. Quizá te ayude el     |
    |    modelo 'ProductFilter'.                                       |
    |                                                                  |
    | 2. Debemos retornar el observable que contiene la colección de   |
    |    productos vendidos. Toca ir a servidor a través del servicio  |
    |    ProductService, que tendrás que inyectar como dependencia.    |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    // console.log(customFilter)
    return this._productService.getAllSoldProductsToReset(customFilter);
  }

}
