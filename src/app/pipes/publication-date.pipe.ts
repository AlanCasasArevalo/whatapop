import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { Product } from './../product';

@Pipe({
  name: 'publicationDate'
})
export class PublicationDatePipe implements PipeTransform {

  transform(product: number) {
    let time = moment( product ).fromNow()
    
    
    // .calendar(null, {
    //   sameElse: "DD/MM/YYYY"
    // })
    
    
    // console.log("Se ha creado en numeros " + time.unix() )
    // console.log("Se ha creado en numeros " + time.format("L") )
    // console.log("Se ha creado " + time.fromNow() )
    // console.log("Se ha creado en fecha " + time.date() )
    // console.log("Se ha creado hace  " + time.days() + " dias") 
    // console.log("Se ha creado " + time.fromNow()) 

    return time
  }

}
