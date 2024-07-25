import { StorageService } from './../../services/storage.service';
import { ChangeDetectionStrategy, Component, inject,  OnInit,  Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatListModule, MatListOption} from '@angular/material/list';
import { CertificateGenerateItem } from '../../models/certificateGenerate.model';
import { CertificatePreGenerateItem } from '../../models/certificatePreGenerate.model';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { CertificateService } from './../../services/certificate.service';


export interface RowItemPreCert {
  nit: string;
  dataType:number;
  year_tribute: string;
  cuantos:number;
  range_ini:string;
  range_end:string;
  city:string;
}

export interface RowItem {
  code:number;
  id_certificate_data:string;
  nit:string;
  nombreConcepto:string;
  razonSocial:string;
}

export interface RowItems {
  rows:RowItem[]
}

export interface RowItemsPreCert {
  rows:RowItemPreCert[]
}


export interface DialogData {
  rows:RowItemPreCert[];
}

interface CertificatesGenerated {
  id_certificados_generado:string;
  tipo_certificado:string;
  nombre:string;
  organization_asociate:string;
  name:string;
  nit:string;
  dv:string;
  url_assoc_file:string;
}

@Component({
  selector: 'dialog',
  //styleUrls: ['./_dialog.component.css'],
  templateUrl: './_dialog-cert.component.html',
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
export class DialogCertComponent implements OnInit
{
 showResultDialog?: boolean;
 nowCertificacion?: string;
 rows?:RowItem[];
 certificateSelected?:CertificatePreGenerateItem;
 certificatesGenerated?: CertificatesGenerated[];
  constructor(
    private snackBar: MatSnackBar,
    public storageService: StorageService,
    public certificateService:CertificateService,
    public dialogRef: MatDialogRef<DialogCertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.showResultDialog=false;
  }

  onNoClick(): void {
    console.log("onNoClick");
    this.dialogRef.close(this.certificatesGenerated);
  }

  onClose():void{
    console.log("onClose");
    this.dialogRef.close({data:this.certificatesGenerated});
  }


  isLoggedIn = false;
  ngOnInit(): void {
    //this.rows=this.data.rows;
    console.log(this.data.rows,"ng");
    // this.data.rows.forEach( (value,index)=>{
    //   console.log(this.data.rows[index],"ng");
    // } );


  }


  selectedItemCert(select: MatListOption[]): void {
    this.certificateSelected=select[0].value;
    console.log(this.certificateSelected);
    console.log(this.certificateSelected?.cuantos);
  }

  generateCertificateBase(): void {

  const nit=this.certificateSelected?.nit;
  const dataType=this.certificateSelected?.dataType;
  let year_tribute=this.certificateSelected?.year_tribute;
      year_tribute=year_tribute?.trim();
  const cuantos=this.certificateSelected?.cuantos;
  const range_ini=this.certificateSelected?.range_ini;
  const range_end=this.certificateSelected?.range_end;
  const city=this.certificateSelected?.city;
  const orgAsociate=this.storageService.getUser()?.id_organization;

     this.certificateService.setCertificate(
       nit||"",
       String(dataType),
       year_tribute||"",
       orgAsociate,
       range_ini||"",
       range_end||"")
       .subscribe({
         next: data => {

         if(data?.code!=200){
             console.log("Error: "+data?.message);
             //this.setLoaderHide();
             //this.snackBar.open(data?.message,"Cerrar");
             //this.loader=false;
           }else{
             console.log(data,"DATA");
             this.nowCertificacion=data?.certificacion_generate;
               this.certificateService.allCertificatesByOrg(orgAsociate).subscribe({
                 next: data => {
                   this.certificatesGenerated=data;
                   this.showResultDialog=true;
                   //////console.log(this.certificatesGenerated);
                   //////console.log(data);
                 },
                 error: err => {
                    //this.errorMessage = err?.error?.message;
                   // this.isLoginFailed = true;
                   console.log(err?.error?.message);
                   //this.setLoaderHide();
                 },complete: () => {
                   //this.setLoaderHide();
                   //this.isLoaderShow=false;
                   console.log("Completado");
                   //this.isLoaderShow=false;
                 }
               });


             //this.setLoaderHide();
           }

         },
         error: err => {
           console.log(err?.error?.message);
           //this.snackBar.open(err?.error?.message,"Cerrar");
           //this.isLoaderShow=false;
         },
         complete: () => {
           console.log("Completado");
           //this.setLoaderHide();

           //this.isLoaderShow=false;
         }
       });
  }


}
