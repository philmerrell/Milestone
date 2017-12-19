import { Component, OnInit, Input } from '@angular/core';
import { LedgerService } from '../../ledger/ledger.service';
import { GdaxService } from '../../core/gdax.service';
import { MatDialog } from '@angular/material';
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';

@Component({
  selector: 'buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  @Input() currency: string;
  constructor(
    private gdaxService: GdaxService,
    private ledgerService: LedgerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  buy(amount) {
    this.gdaxService.getPrice(`${this.currency}-USD`).toPromise()
      .then(result => {
        const purchase = {
          amount: amount,
          price: result['price'],
          currency: this.currency
        };

        this.ledgerService.buy(purchase)
          .then(() => {
            const item = { amount: -(parseFloat(result['price']) * purchase.amount) };
            this.ledgerService.debt(item);
            console.log('bought', item);
          });
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      width: '250px',
      data: { currency: this.currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buy(result);
      }
    });
  }

}
