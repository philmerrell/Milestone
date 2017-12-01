import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GdaxService {

  constructor(private http: HttpClient) { }

  getPrice(currency) {
    return this.http.get('https://api.gdax.com/products/' + currency + '/ticker');
  }

}
