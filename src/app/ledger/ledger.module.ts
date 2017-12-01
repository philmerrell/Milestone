import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedgerComponent } from './ledger.component';
import { MaterialModule } from '../material/material.module';
import { DataTableComponent } from './data-table/data-table.component';
import { LedgerService } from './ledger.service';
import { GdaxService } from '../core/gdax.service';
import { LiveTotalComponent } from './live-total/live-total.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    LedgerComponent,
    DataTableComponent,
    LiveTotalComponent
  ],
  entryComponents: [],
  exports: [ LedgerComponent ],
  providers: [
  ]
})
export class LedgerModule { }
