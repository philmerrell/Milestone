import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatCardModule,
  MatTableModule, MatSortModule, MatIconModule, MatTooltipModule, MatMenuModule, MatListModule,
  MatDialogModule, MatInputModule, MatSelectModule, MatSelect } from '@angular/material';


@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
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
