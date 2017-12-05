import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LivePriceComponent } from './live-price.component';
import { BuyDialogComponent } from './buy/buy-dialog/buy-dialog.component';
import { BuyComponent } from './buy/buy.component';
import { LivePriceService } from './live-price.service';
import { WebsocketService } from '../websocket.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    BuyComponent,
    BuyDialogComponent,
    LivePriceComponent
  ],
  entryComponents: [ BuyDialogComponent ],
  exports: [ LivePriceComponent ],
  providers: [  ]
})
export class LivePriceModule { }
