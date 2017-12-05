import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AfterViewInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { LedgerService } from '../ledger.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  dataSourceData: Observable<any>;
  displayedColumns = ['currency', 'amount', 'price', 'timePurchased', 'actions'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data;
  @Output() removeItem = new EventEmitter<any>();
  filteredData = {};


  constructor(private ledgerService: LedgerService) {

  }

  ngOnChanges(changes) {
    console.log(changes);
    console.log(changes.data.currentValue);
    if (changes.data.currentValue) {
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource.sort = this.sort;
    }
  }

  deleteItem(item) {
    this.removeItem.emit(item);
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
  }

}
