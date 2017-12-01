import { Component, OnInit, OnDestroy } from '@angular/core';
import { LivePriceService } from '../../live-price/live-price.service';
import { LedgerService } from '../ledger.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'live-total',
  templateUrl: './live-total.component.html',
  styleUrls: ['./live-total.component.css']
})
export class LiveTotalComponent implements OnInit, OnDestroy {
  total = 0;
  price = 0;
  amount = 0;

  constructor(private priceService: LivePriceService, private ledgerService: LedgerService) { }

  ngOnInit() {
    // this.priceService.getLivePrice()
    // .subscribe(msg => {
    //   const response = msg;
    //   this.price = parseFloat(response.price) || 0;
    //   this.calculateTotal();
    // });
    this.getLedger();
  }

  ngOnDestroy() {
    // this.priceService.getLivePrice().
  }

  getLedger() {
    this.ledgerService.getEthLedger().subscribe(ledger => {
      // console.log('Ledger: ', ledger);
      // TODO: This should be a property calculated with a cloud function;
      if (ledger.length) {
        this.amount = 0;
        for (const item of ledger) {
          let float = parseFloat(item.amount);
          this.amount = this.amount + float;
        }
        console.log(this.amount);
      }
    });
  }

  calculateTotal() {
    this.total = this.price * this.amount || 0;
  }

  getTotal() {
  }



}
