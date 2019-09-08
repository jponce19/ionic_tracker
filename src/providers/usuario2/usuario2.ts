import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the Usuario2Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Usuario2Provider {

  constructor(public http: HttpClient) {
    console.log('Hello Usuario2Provider Provider');
  }

}
