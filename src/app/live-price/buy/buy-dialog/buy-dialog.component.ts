import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GdaxService } from '../../../core/gdax.service';

@Component({
  selector: 'buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.css']
})
export class BuyDialogComponent implements OnInit {
  transaction = {
    amount: 0
  };
  price;

  constructor(
    public dialogRef: MatDialogRef<BuyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gdaxService: GdaxService) { }

  ngOnInit() {
    this.getEthPrice();
  }

  saveTransaction(): void {
    this.dialogRef.close(this.transaction.amount);
  }

  getEthPrice() {
    this.gdaxService.getPrice('ETH-USD').toPromise()
    .then(result => {
      this.price = result['price'];
    });
  }

}
