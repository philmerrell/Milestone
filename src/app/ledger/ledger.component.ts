import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LedgerService } from './ledger.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  ledgerData$: Observable<any>;

  constructor(
    private ledgerService: LedgerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.ledgerData$ = this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.getLedger(params.get('id')));
  }

  deleteLedgerItem(item) {
    this.ledgerService.deleteItem(item);
  }

  getLedger(currency) {
    return this.ledgerService.getLedger(currency);
  }

}
