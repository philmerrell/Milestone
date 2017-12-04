import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LedgerService } from './ledger.service';

@Component({
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  currency = 'ALL';
  ledger = {};
  ledgerData;

  constructor(private ledgerService: LedgerService) { }

  ngOnInit() {
    this.ledgerService.getLedger()
      .subscribe(result => {
        this.ledger['all'] = result;
        this.ledgerData = this.ledger['all'];
        console.log('hey');
        this.filterCurrency(this.currency);
      });
  }

  deleteLedgerItem(id) {
    this.ledgerService.deleteItem(id);
  }

  filterCurrency(selection) {
    const currency = selection['value'];
    if (currency) {
      this.ledger[selection] = this.ledger['all'].filter(item => item.currency === currency);
      this.ledgerData = this.ledger[selection];
    } else {
      this.ledgerData = this.ledger['all'];
    }
  }

}
