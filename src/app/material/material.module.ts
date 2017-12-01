import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatCardModule,
  MatTableModule, MatSortModule, MatIconModule, MatTooltipModule, MatMenuModule, MatListModule,
  MatDialogModule, MatInputModule } from '@angular/material';


@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule
  ]
})
export class MaterialModule { }
