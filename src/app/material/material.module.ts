import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatCardModule,
  MatTableModule, MatSortModule, MatIconModule, MatTooltipModule, MatMenuModule, MatListModule,
  MatDialogModule, MatInputModule, MatSelectModule, MatSelect, MatChipsModule, MatGridListModule } from '@angular/material';


@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule
  ]
})
export class MaterialModule { }
