import { StorageService } from '../../services/storage.service';
import { ChangeDetectionStrategy, Component, inject,  OnInit,  Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';


export interface RowItem {
  code:number;
  id_certificate_data:string;
  nit:string;
  nombreConcepto:string;
  razonSocial:string;
}

export interface DialogData {
  rows:RowItem[];
}
@Component({
  selector: 'dialog',
  //styleUrls: ['./_dialog.component.css'],
  templateUrl: './_dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatListModule
  ]
})
export class DialogComponent implements OnInit
{
 rows?:RowItem[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  isLoggedIn = false;
  ngOnInit(): void {

  }

}
