import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { LivePriceService } from '../../live-price/live-price.service';
import { LedgerService } from '../ledger.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'live-total',
  templateUrl: './live-total.component.html',
  styleUrls: ['./live-total.component.css']
})
export class LiveTotalComponent implements OnInit, OnChanges {
  @Input() currencyType: string;
  ledger;
  total = 0;
  price = 0;
  amount = 0;

  constructor(private priceService: LivePriceService, private ledgerService: LedgerService) { }

  ngOnChanges(changes) {
    const currency = changes['currencyType'].currentValue;
    console.log(changes);
    if (currency) {
      this.getAmount();
    }
  }
  ngOnInit() {
    this.getLedger();
  }

  getLedger() {
    this.ledgerService.getLedger()
      .subscribe(ledger => this.ledger = ledger);
  }

  calculateTotal(currency) {
    this.total = this.price * this.amount || 0;
  }

  getTotal() {
  }

  getAmount() {
    if (this.ledger.length) {
      this.amount = 0;
      for (const item of this.ledger) {
        if (item.currency === this.currencyType) {
          const float = parseFloat(item.amount);
          this.amount = this.amount + float;
        }
      }
    }
  }



}
