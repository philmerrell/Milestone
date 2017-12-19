import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';
import { LivePriceModule } from '../live-price/live-price.module';
import { HomeService } from './home.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    LivePriceModule,
    RouterModule
  ],
  declarations: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
