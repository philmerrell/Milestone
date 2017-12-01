import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LedgerService } from './ledger.service';

@Component({
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  ledgerData;

  constructor(private ledgerService: LedgerService) { }

  ngOnInit() {
    this.ledgerService.getEthLedger()
      .subscribe(result => {
        console.log(result);
        this.ledgerData = result;
      });
  }

  deleteLedgerItem(id) {
    console.log(id);
    this.ledgerService.deleteItem(id);
  }

}
