import { UserService } from './../../services/user.service';
import { CertificateService } from './../../services/certificate.service';
import { OrganizationService } from './../../services/organization.service';
import {
  Component,
  OnInit,
  DoCheck,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { FormControl,Validators } from '@angular/forms';
import { MaxSizeValidator } from '@angular-material-components/file-input';
import { MatListOption } from '@angular/material/list';
import { CertificateGenerateItem } from '../../models/certificateGenerate.model';
import { FIleService } from '../../services/file.service';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogComponent, RowItems } from '../_dialog/_dialog.component';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import 'moment/locale/es';
import { MatDatepicker } from '@angular/material/datepicker';
import { RowItemSave } from '../../models/tutorial.model copy';
import { DialogCertComponent, RowItemsPreCert } from '../_dialog-cert/_dialog-cert.component';
import { NgOptimizedImage } from '@angular/common';

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

interface Anio {
  value: string;
  viewValue: string;
}
interface City {
  value: string;
  viewValue: string;
}
interface Centificado {
  id_type_certificate: string;
  name_type: string;
  description:string;
  indicator:string;
}
interface Organization {
  id_organization: string;
  name: string;
  nit:string;
  dv:string;
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

export interface RowItemPreCert {
  cuantos:number;
  range_ini:string;
  range_end:string;
  city:string;
}

interface Rol{
  id_rol_user:number;
  id_user:number;
  id_rol:number;
  name_rol:string;
}

const moment = _rollupMoment || _moment;
@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Principal implements OnInit, DoCheck   {
  date = new FormControl(moment());
  dateSince = new FormControl(moment());
  dateUntil = new FormControl(moment());

  //dataRows?:RowItems;
  dataRows?:RowItems;
  dataRowsPreCert?:RowItemsPreCert;
  rows?:RowItem[];
  isLoaderShow:boolean;
  oldIsLoaderShow=false;
  showLoader:boolean=false;
  formData=new FormData();
  file=File;
  options: any = {
    autoBom: false,
  };
  certificateSelected?:CertificateGenerateItem;
  files: any[]=[];
  maxSize= 16;
  fileControl = new FormControl('', [Validators.required,MaxSizeValidator(this.maxSize * 6024)]);
  form: any = {
    uploadFile: null
  };
  formGenerate:any={
    nit:null,
    tipo_retencion:null,
    year_tribute:null,
    idOrganizacion:null,
    city:null,
    rangeSince:null,
    rangeUntil:null
  }
  noChangeCount=0;
  changeDetected = false;
  changeLog=new Array<string>();

  generalNit?: string;
  result?:string="";
  footerActive=false;
  state="";
  stateShowLoader="";
  downloadFiles = false;
  profile = false;
  oldDownloadFiles = false;
  uploadFiles=false;
  home=false;
  loader=false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  idOrganizacion:string="0";
  namesUser:string="";
  lastName:string="";
  orgAsociate:string="";
  idUser:string="";
   anios: Anio[] = [
    {value: '0', viewValue: '2020'},
    {value: '1', viewValue: '2021'},
    {value: '2', viewValue: '2022'},
    {value: '3', viewValue: '2023'},
    {value: '4', viewValue: '2024'},
  ];
  cities: City[] = [
    {value: '0', viewValue: 'Medellin'},
    {value: '1', viewValue: 'Bogota'},
    {value: '2', viewValue: 'Barranquilla'},
    {value: '3', viewValue: 'Cali'},
    {value: '4', viewValue: 'Cartagena'},
    {value: '5', viewValue: 'Tolima'}
  ];
  roles?:Rol[];
  certificados?: Centificado[];
  organizations?: Organization[];
  certificatesGenerated?: CertificatesGenerated[];
  oldCertificatesGenerated?: CertificatesGenerated[];
  currentIndex = -1;
  typeCertSelected=0;
  anioSelected=0;
  citySelected=0;

  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fIleService : FIleService,
    private OrganizationService: OrganizationService,
    private CetificateService : CertificateService,
    private AuthService: AuthService,
    private router: Router,
    private storageService: StorageService,
  ) {
    this.home =true;
    this.isLoaderShow=false;
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  setMonthAndYearSince(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateSince.value ?? moment();

    ctrlValue.day(normalizedMonthAndYear.day());
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateSince.setValue(ctrlValue);

    console.log(this.dateSince.getRawValue()?.month());
    console.log(normalizedMonthAndYear.format('YYYY-MM-DD') );

    // let sum=null;
    // if(this.dateSince.getRawValue()?.month()==1){
    //   sum=moment(normalizedMonthAndYear).add(27,'d');
    // }else{
    //   sum=moment(normalizedMonthAndYear).add(29,'d');
    // }
    this.formGenerate.rangeSince=normalizedMonthAndYear.format('YYYY-MM-DD');

    // console.log(sum);
    // console.log(sum.format('YYYY-MM-DD'),"SUM" );

    console.log(this.formGenerate.rangeSince );

    datepicker.close();
  }
  setMonthAndYearUntil(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateUntil.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateUntil.setValue(ctrlValue);

    let sum=null;
    if(this.dateUntil.getRawValue()?.month()==1){
      sum=moment(normalizedMonthAndYear).add(27,'d');
    }else{
      sum=moment(normalizedMonthAndYear).add(29,'d');
    }

    //this.formGenerate.rangeUntil=normalizedMonthAndYear.format('YYYY-MM-DD');

    this.formGenerate.rangeUntil=sum.format('YYYY-MM-DD');

    console.log(this.formGenerate.rangeUntil);
    datepicker.close();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data:{rows:this.dataRows},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rows = result;
    });
  }
  openDialogCert(): void {
    const dialogRef = this.dialog.open(DialogCertComponent, {
      data:{rows:this.dataRowsPreCert},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result?.data);
      this.certificatesGenerated=[];
      this.certificatesGenerated=result?.data as CertificatesGenerated[];
    });

  }
  setLoaderShow():void{
    this.isLoaderShow=true;
    this.storageService.setStateShowLoader(true);
  }
  setLoaderHide():void{
      this.isLoaderShow=false;
      this.storageService.setStateShowLoader(false);
  }
  validationRolUploadFile(){
    let val=false;
    if(this.roles?.length){
      this.roles?.forEach(element=>{

        console.log(element.name_rol);

        if(element.name_rol==='ADMIN'){
          console.log(element.name_rol,"Es ADMIN");
          val=true;

        }

      });
      console.log(val);
      return val;
    }else{
      return false;
    }
  }
  ngDoCheck(): void {

    if (this.downloadFiles!== this.oldDownloadFiles) {
      //this.isLoaderShow=true;
      this.changeDetected = true;
      //this.changeLog.push(`DoCheck: Hero name changed to "${this.downloadFiles}" from "${this.oldDownloadFiles}"`);
      this.oldDownloadFiles = this.downloadFiles;
      this.generalNit=this.storageService.getUser()?.nit;
      this.state=this.storageService.statePrincipal();
      this.stateShowLoader=this.storageService.stateShowLoader();
      this.roles=this.storageService.getUser()?.rols;
      this.idOrganizacion=this.storageService.getUser()?.id_organization;

      if(this.state!=""){

        if(this.state=="downloadFiles"){
          this.downloadFiles=true;
          this.uploadFiles=false;
          this.home=false;
          this.profile=false;

          this.CetificateService.getTypesCertificates().subscribe({
            next: data => {
              ////console.log(data);
              this.certificados=data;
            },
            error: err => {
              // this.errorMessage = err?.error?.message;
              // this.isLoginFailed = true;
              ////console.log(err?.error?.message);
            },complete: () => {
              //this.isLoaderShow=false;
              ////console.log("Completado");
              //this.isLoaderShow=false;
            }
          });

          this.OrganizationService.getAllOrganizations(this.generalNit||"").subscribe({
            next: data => {
              this.organizations=data;
            },
            error: err => {
              ////console.log(err?.error?.message);
              //return;
            },complete: () => {
              //this.isLoaderShow=false;
              ////console.log("Completado");
              //this.isLoaderShow=false;
            }
          });

          this.CetificateService.allCertificatesByOrg(this.idOrganizacion).subscribe({
            next: data => {
              this.certificatesGenerated=data;
              //////console.log(this.certificatesGenerated);
              //////console.log(data);
            },
            error: err => {
              // this.errorMessage = err?.error?.message;
              // this.isLoginFailed = true;
              ////console.log(err?.error?.message);
            },complete: () => {
              //this.isLoaderShow=false;
              ////console.log("Completado");
              //this.isLoaderShow=false;
            }
          });


        }
        if(this.state=="uploadFiles"){
          this.downloadFiles=false;
          this.uploadFiles=true;
          this.home=false;
          this.profile=false;
        }
        if(this.state=="home"){
          this.downloadFiles=false;
          this.uploadFiles=false;
          this.profile=false;
          this.home=true;
        }
        if(this.state=="profile"){
          this.downloadFiles=false;
          this.uploadFiles=false;
          this.home=false;
          this.profile=true;
        }
      }

    }

    if(this.isLoaderShow!==this.oldIsLoaderShow){
      this.changeDetected = true;
      //this.changeLog.push(`DoCheck: Hero name changed to "${this.isLoaderShow}" from "${this.oldIsLoaderShow}"`);
      this.oldIsLoaderShow=this.isLoaderShow;
      this.stateShowLoader=this.storageService.stateShowLoader();

      if(this.stateShowLoader==="true"){
        this.isLoaderShow=true;
      }else if(this.stateShowLoader==="false"){
        this.isLoaderShow=false;
      }else{
        this.isLoaderShow=false;
      }

    }
    // else{
    //   this.stateShowLoader=this.storageService.stateShowLoader();
    // }

    if (this.changeDetected) {
        this.noChangeCount = 0;
    } else {
        // log that hook was called when there was no relevant change.
        const count = this.noChangeCount += 1;
        //const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
        if (count === 1) {
          // add new "no change" message
          //this.changeLog.push(noChangeMsg);
        } else {
          // update last "no change" message
          //this.changeLog[this.changeLog.length - 1] = noChangeMsg;
        }
    }
    this.changeDetected = false;
    //////console.log(this.changeLog,"Change Log");
    //this.isLoaderShow=false;
  }
  ngOnInit(): void {

    //this.isLoaderShow=false;
    this.stateShowLoader=this.storageService.stateShowLoader();

    if(this.stateShowLoader==="true"){
      this.setLoaderShow();
    }else if(this.stateShowLoader==="false"){
      this.setLoaderHide();
    }else{
      this.setLoaderHide();
    }
    this.setLoaderShow();

    this.fileControl.valueChanges.subscribe((files: any) => {
      this.setLoaderShow();
      this.files=[];
      //////console.log(files,"FILESAAA");
      if (!Array.isArray(files)) {
        this.files = [files];
        this.formData.append('fileUpload',this.files[0],this.files[0]?.name);
        //this.form.uploadFile=this.files[0];
      } else {
        this.files = files;
        this.formData.append('fileUpload',this.files[0],this.files[0]?.name);
      }
      this.setLoaderHide();
    });

    this.generalNit=this.storageService.getUser()?.nit;
    this.idOrganizacion=this.storageService.getUser()?.id_organization;
    this.namesUser=this.storageService.getUser()?.names;
    this.lastName=this.storageService.getUser()?.lastname;
    this.orgAsociate=this.storageService.getUser()?.ornganization_name;
    this.idUser=this.storageService.getUser()?.idUser;
    this.roles=this.storageService.getUser()?.rols;

    //this.appComponent.footerActive=true;
    this.state=this.storageService.statePrincipal();

    if(this.state!=""){

      if(this.state=="downloadFiles"){
        this.downloadFiles=true;
        this.uploadFiles=false;
        this.profile=false;
        this.home=false;
        this.setLoaderShow();
        this.CetificateService.getTypesCertificates().subscribe({
          next: data => {
            this.certificados=data;
            //this.isLoaderShow=false;
            ////console.log(data);
            this.setLoaderHide();
          },
          error: err => {
            this.setLoaderHide();
          },
          complete: () => {
            this.setLoaderHide();
          }
        });
        this.setLoaderShow();
        this.OrganizationService.getAllOrganizations(this.generalNit||"").subscribe({
          next: data => {
            this.organizations=data;
            //this.isLoaderShow=false;
            //return;
          },
          error: err => {
            ////console.log(err?.error?.message);
            //*-----this.isLoaderShow=false;
            //return;
          },
          complete: () => {
            //this.isLoaderShow=false;
            ////console.log("Completado");
            //this.isLoaderShow=false;
            //return;
          }
        });
        //*-----this.isLoaderShow=false;
        this.setLoaderShow();
        this.CetificateService.allCertificatesByOrg(this.idOrganizacion).subscribe({
          next: data => {
            this.certificatesGenerated=data;
            //////console.log(this.certificatesGenerated);
            //////console.log(data);
          },
          error: err => {
            // this.errorMessage = err?.error?.message;
            // this.isLoginFailed = true;
            ////console.log(err?.error?.message);
          },complete: () => {
            //this.isLoaderShow=false;
            ////console.log("Completado");
            //this.isLoaderShow=false;
          }
        });

      }
      if(this.state=="uploadFiles"){
        this.downloadFiles=false;
        this.profile=false;
        this.uploadFiles=true;
        this.home=false;

      }
      if(this.state=="home"){
        this.downloadFiles=false;
        this.uploadFiles=false;
        this.profile=false;
        this.home=true;
      }
      if(this.state=="profile"){
        this.downloadFiles=false;
        this.uploadFiles=false;
        this.home=false;
        this.profile=true;
      }
      //this.isLoaderShow=false;
    }

    //this.retrieveTutorials();
    if (this.storageService?.isLoggedIn()) {
      //this.isLoggedIn = true;
      //this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/principal']);
    }else{
      this.router.navigate(['/landing']);
    }
    //this.isLoaderShow=false;
    this.setLoaderHide();
  }
  async onSubmit(): Promise<void> {
    this.setLoaderShow();

    ////console.log("Arr",this.files);
    const {name}=this.files[0];

    const upload= this.fIleService.upLoadFIle(this.formData).subscribe({
      next: data => {

        if(data?.body?.creation?.code==200){
          ////console.log(data,"upLoadFIle-DATAA");
          const tmpDataRows=data?.body?.rows_proocessed;

          // data?.body?.rows_proocessed.forEach((value:RowItem,index:number) => {
          //   //////console.log(JSON.stringify(value));
          //   console.log(data?.body?.rows_proocessed[index]);
          //   let item=value;
          //   this.dataRows?.push(
          //     data?.body?.rows_proocessed[index][index]
          //   );
          // });
          console.log(JSON.stringify(data?.body?.rows_proocessed));
          for(let i=0; i<data?.body?.rows_proocessed.length; i++){
            //console.log(data?.body?.rows_proocessed [i]);
            let item=new RowItemSave();
            item=data?.body?.rows_proocessed[i];
            console.log(JSON.stringify(item.code));
          }
          this.dataRows=data?.body?.rows_proocessed;

          // data?.body?.rows_proocessed.forEach( (element:RowItem,index:number) => {
          //   this.dataRows?.push({
          //     code:data?.body?.rows_proocessed[index].code,
          //     nit:data?.body?.rows_proocessed[index].nit,
          //     id_certificate_data:data?.body?.rows_proocessed[index].id_certificate_data,
          //     nombreConcepto:data?.body?.rows_proocessed[index].nombreConcepto,
          //     razonSocial:data?.body?.rows_proocessed[index].razonSocial
          //   } as RowItem
          // );
          // });

          //this.rows=data?.body?.rows_proocessed as RowItem[];

          console.log(JSON.stringify(this.dataRows),"IN onSubmit");
          ////console.log(JSON.stringify(this.dataRows),"dataRows");


          //////console.log(this.dataRows);
          this.openDialog();
        }else {
          this.setLoaderHide();
        }
      },
      error: err => {
        ////console.log(err?.error?.message);
        this.setLoaderHide();
      },
      complete: () => {
        ////console.log("Completado");
        this.setLoaderHide();
      }
    }
    );
  //   this.setLoaderShow();


  //   await this.fIleService.readFIle(name).subscribe({
  //     next: data => {
  //       //////console.log(data,"fileProcesate-DATA");
  //     if(data?.code==200){
  //         ////console.log(data,"fileProcesate-DATA");
  //         this.dataRows=data?.rows_proocessed;
  //         this.openDialog();
  //       }else {
  //         this.setLoaderHide();
  //       }
  //     },
  //     error: err => {
  //       ////console.log(err?.error?.message);
  //       this.setLoaderHide();
  //     },
  //     complete: () => {
  //       ////console.log("Completado");
  //       this.setLoaderHide();
  //     }

  // });

  }
  onSubmitGenerate(): void {
    this.setLoaderShow();
    const {
      nit,rangeSince,rangeUntil
    } = this.formGenerate;

    const tipo_retencion:string=String(this.typeCertSelected);
    const year_tribute =String(this.anioSelected);
    const idOrg=this.idOrganizacion;

    this.CetificateService.getPreCertification( nit,tipo_retencion,year_tribute,idOrg).subscribe({
      next: data => {

        if(data?.status!=200){
            ////console.log("Error: "+data?.message);
            this.setLoaderHide();
            this.snackBar.open(data?.message,"Cerrar");
            //this.loader=false;
          }else{
            ////console.log(data,"DATA");
            this.dataRowsPreCert=data?.result as RowItemsPreCert;
            this.openDialogCert();
            //this.setLoaderHide();
          }
        },
        error: err => {
          this.snackBar.open(err?.error?.message,"Cerrar");
        },
        complete: () => {
          this.setLoaderHide();
        }
    });

    // this.CetificateService.setCertificate(
    //   nit,
    //   tipo_retencion,
    //   year_tribute,
    //   idOrg,
    //   rangeSince,
    //   rangeUntil)
    //   .subscribe({
    //     next: data => {

    //     if(data?.code!=200){
    //         ////console.log("Error: "+data?.message);
    //         this.setLoaderHide();
    //         this.snackBar.open(data?.message,"Cerrar");
    //         //this.loader=false;
    //       }else{
    //         ////console.log(data,"DATA");
    //         //this.setLoaderHide();

    //         this.snackBar.open(data?.message,"Cerrar").onAction().subscribe(() => {
    //           this.CetificateService.allCertificatesByOrg("1").subscribe({
    //             next: data => {
    //               this.certificatesGenerated=data;
    //               //////console.log(this.certificatesGenerated);
    //               //////console.log(data);
    //             },
    //             error: err => {
    //               // this.errorMessage = err?.error?.message;
    //               // this.isLoginFailed = true;
    //               ////console.log(err?.error?.message);
    //               this.setLoaderHide();
    //             },complete: () => {
    //               this.setLoaderHide();
    //               this.isLoaderShow=false;
    //               ////console.log("Completado");
    //               this.isLoaderShow=false;
    //             }
    //           });
    //         });
    //       }

    //     },
    //     error: err => {
    //       ////console.log(err?.error?.message);
    //       this.snackBar.open(err?.error?.message,"Cerrar");
    //       //this.isLoaderShow=false;
    //     },
    //     complete: () => {
    //       ////console.log("Completado");
    //       this.setLoaderHide();

    //       //this.isLoaderShow=false;
    //     }
    //   });




      this.setLoaderHide();
  }

  selectedItemCert(select: MatListOption[]): void {
    this.certificateSelected=select[0].value;
    ////console.log(JSON.stringify(this.certificateSelected));
    //////console.log(this.certificateSelected[0]);
  }
  changeTypeCert($event:any): void {
    this.typeCertSelected=$event;
    this.formGenerate.tipo_retencion=$event
  }
  changeAnioCert($event:any): void {
    this.anioSelected=$event;
    this.formGenerate.year_tribute=$event;
  }
  changeCityCert($event:any): void {
    this.citySelected=$event;
    this.formGenerate.city=$event;
  }

  decargar():void {
    window.open(`${environment.downloadPathApi}${this.certificateSelected?.url_assoc_file}`, '_blank');
  }

  getAssetsENV():string{
    return environment.assertsPath;
  }

  activeDownloadFiles():void{
    this.isLoaderShow=true;
    this.downloadFiles=true;
    this.home=false;
    this.uploadFiles=false;
    this.profile=false;
    this.storageService.setStatePrincipal("downloadFiles");
    this.isLoaderShow=false;
  }
  activeUploadFiles():void{
    this.downloadFiles=false;
    this.home=false;
    this.uploadFiles=true;
    this.profile=false;
    this.storageService.setStatePrincipal("uploadFiles");
  }

  activeHome():void{
    this.downloadFiles=false;
    this.home=true;
    this.uploadFiles=false;
    this.profile=false;
    this.storageService.setStatePrincipal("home");
  }
  activeProfile():void{
    this.downloadFiles=false;
    this.home=false;
    this.uploadFiles=false;
    this.profile=true;
    this.storageService.setStatePrincipal("profile");
  }

  exit(): void{
    window?.sessionStorage?.clear();
    this.router?.navigate(['/landing']);
    //this.AuthService.logout();
  }
  goToPrincipal($myParam: string = ''): void {
    this.router?.navigate(['/landing']);
  }

  clearForm():void {
    this.fileControl.setValue('');
  }
}
