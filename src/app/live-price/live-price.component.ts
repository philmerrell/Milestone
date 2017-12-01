import { Component, OnInit, Input } from '@angular/core';
import { LivePriceService } from './live-price.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';
import { WebsocketService } from '../websocket.service';
import { GdaxService } from '../core/gdax.service';

export interface Item { name: string; }

@Component({
  selector: 'live-price',
  templateUrl: './live-price.component.html',
  styleUrls: ['./live-price.component.css']
})
export class LivePriceComponent implements OnInit {
  @Input() currencyType: string;
  liveCurrency$;
  currency$;
  message: any;
  items: Observable<any[]>;
  private user;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private authService: AuthService,
              private gdaxService: GdaxService,
              private priceService: LivePriceService,
              private afs: AngularFirestore,
              private websocketService: WebsocketService) {}

  ngOnInit() {
    this.sendMsg();
    this.getPrice(this.currencyType);
  }

  createMsg() {
    this.message = {
      'type': 'subscribe',
      'product_ids': [
        this.currencyType
      ],
      'channels': ['ticker']
    };
  }

  getPrice(currency) {
    this.currency$ = this.gdaxService.getPrice(currency);
  }

  getLivePrice() {
    this.priceService.getLivePrice()
      .map(msg => msg = JSON.parse(msg.data))
      .filter(product => product.product_id === this.currencyType)
      .subscribe(currency => {
        this.liveCurrency$ = currency;
      });
  }

  sendMsg() {
    this.createMsg();
    this.priceService.messages.next(this.message);
    this.getLivePrice();
  }

}
