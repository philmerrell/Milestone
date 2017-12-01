import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WebsocketService } from '../websocket.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const WS_URL = 'wss://ws-feed.gdax.com';

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class LivePriceService {
  public messages: BehaviorSubject<any>;

  constructor(wsService: WebsocketService) {
    this.messages = <BehaviorSubject<any>>wsService.connect(WS_URL).share();
  }

  getLivePrice() {
    return this.messages.asObservable();
  }
}
