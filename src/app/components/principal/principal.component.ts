import { CertificateService } from './../../services/certificate.service';
import { OrganizationService } from './../../services/organization.service';
import { AppComponent } from './../../app.component';
import { Component, Input, OnInit, OnChanges,ViewChild,AfterViewInit, DoCheck, SimpleChanges, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

import { FormControl,Validators } from '@angular/forms';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import { MatListOption } from '@angular/material/list';
import { CertificateGenerateItem } from '../../models/certificateGenerate.model';
import { FIleService } from '../../services/file.service';
import { environment } from '../../../environments/environment.development';
import { LoadingComponent } from '../_loading/_loading.component';

import { MatSnackBar } from '@angular/material/snack-bar';


//import { saveAs } from 'file-saver';

interface Food {
  value: string;
  viewValue: string;
}

interface Anio {
  value: string;
  viewValue: string;
}

interface Centificado {
  id_type_certificate: string;
  name_type: string;
  description:string;
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

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})

export class Principal implements OnInit, DoCheck {
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
  //fileControl?: FormControl;
  fileControl = new FormControl('', [Validators.required,MaxSizeValidator(this.maxSize * 6024)]);

  form: any = {
    uploadFile: null
  };
  formGenerate:any={
    nit:null,
    tipo_retencion:null,
    year_tribute:null,
    idOrganizacion:null
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
  oldDownloadFiles = false;
  uploadFiles=false;
  home=false;
  loader=false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  idOrganizacion:string="0";
   anios: Anio[] = [
    {value: '0', viewValue: '2020'},
    {value: '0', viewValue: '2021'},
    {value: '0', viewValue: '2022'},
    {value: '0', viewValue: '2023'},
  ];
  certificados?: Centificado[];
  organizations?: Organization[];
  certificatesGenerated?: CertificatesGenerated[];
  currentIndex = -1;
  typeCertSelected=0;
  anioSelected=0;

  constructor(
    private snackBar: MatSnackBar,
    private fIleService : FIleService,
    private OrganizationService: OrganizationService,
    private CetificateService : CertificateService,
    private AuthService: AuthService,
    private router: Router,
    private storageService: StorageService,
  ) {
    this.home =true;
    this.isLoaderShow=true;
    //this.isLoaderShow=false;
    // this.fileControl = new FormControl(this.files, [
    //   Validators.required,
    //   MaxSizeValidator(this.maxSize * 1024)
    // ])
  }

  setLoaderShow():void{
    console.log("setLoaderShow: "+this.isLoaderShow+" from ");
    this.isLoaderShow=true;
    this.storageService.setStateShowLoader(true);
    console.log("setLoaderShow: "+this.isLoaderShow+" to ");
  }
  setLoaderHide():void{
      this.isLoaderShow=false;
      this.storageService.setStateShowLoader(false);
  }

  ngDoCheck(): void {

    if (this.downloadFiles!== this.oldDownloadFiles) {
      //this.isLoaderShow=true;
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Hero name changed to "${this.downloadFiles}" from "${this.oldDownloadFiles}"`);
      this.oldDownloadFiles = this.downloadFiles;
      this.generalNit=this.storageService.getUser()?.nit;
      this.state=this.storageService.statePrincipal();
      this.stateShowLoader=this.storageService.stateShowLoader();

      if(this.state!=""){

        if(this.state=="downloadFiles"){
          this.downloadFiles=true;
          this.uploadFiles=false;
          this.home=false;
          this.CetificateService.getTypesCertificates().subscribe({
            next: data => {
              console.log(data);
              this.certificados=data;
            },
            error: err => {
              // this.errorMessage = err?.error?.message;
              // this.isLoginFailed = true;
              console.log(err?.error?.message);
            },complete: () => {
              this.isLoaderShow=false;
              console.log("Completado");
              this.isLoaderShow=false;
            }
          });
          this.OrganizationService.getAllOrganizations(this.generalNit||"").subscribe({
            next: data => {
              this.organizations=data;
            },
            error: err => {
              console.log(err?.error?.message);
              return;
            },complete: () => {
              this.isLoaderShow=false;
              console.log("Completado");
              this.isLoaderShow=false;
            }
          });
          this.CetificateService.allCertificatesByOrg("1").subscribe({
            next: data => {
              this.certificatesGenerated=data;
              //console.log(this.certificatesGenerated);
              //console.log(data);
            },
            error: err => {
              // this.errorMessage = err?.error?.message;
              // this.isLoginFailed = true;
              console.log(err?.error?.message);
            },complete: () => {
              this.isLoaderShow=false;
              console.log("Completado");
              this.isLoaderShow=false;
            }
          });

        }
        if(this.state=="uploadFiles"){
          this.downloadFiles=false;
          this.uploadFiles=true;
          this.home=false;
        }
        if(this.state=="home"){
          this.downloadFiles=false;
          this.uploadFiles=false;
          this.home=true;
        }

      }

    }

    if(this.isLoaderShow!==this.oldIsLoaderShow){
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Hero name changed to "${this.isLoaderShow}" from "${this.oldIsLoaderShow}"`);
      this.oldIsLoaderShow=this.isLoaderShow;
      this.stateShowLoader=this.storageService.stateShowLoader();

      if(this.stateShowLoader=="true"){
        this.isLoaderShow=true;
      }else if(this.stateShowLoader=="false"){
        this.isLoaderShow=false;
      }else{
        this.isLoaderShow=false;
      }

    }
    if (this.changeDetected) {
        this.noChangeCount = 0;
    } else {
        // log that hook was called when there was no relevant change.
        const count = this.noChangeCount += 1;
        const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
        if (count === 1) {
          // add new "no change" message
          this.changeLog.push(noChangeMsg);
        } else {
          // update last "no change" message
          this.changeLog[this.changeLog.length - 1] = noChangeMsg;
        }
    }
    this.changeDetected = false;
    console.log(this.changeLog,"Change Log");
    //this.isLoaderShow=false;
  }
  ngOnInit(): void {
    this.isLoaderShow=false;
    this.fileControl.valueChanges.subscribe((files: any) => {
      console.log(files,"FILESAAA");
      if (!Array.isArray(files)) {
        this.files = [files];
        this.formData.append('fileUpload',this.files[0],this.files[0]?.name);
        //this.form.uploadFile=this.files[0];
      } else {
        console.log(files,"FILESAAA");
        this.files = files;
        //this.form.uploadFile=this.files[0];
        this.formData.append('fileUpload',this.files[0],this.files[0]?.name);
      }
      //console.log(this.files,"FILES-SSSS");
    })
    this.isLoaderShow=true;
    console.log(this.storageService.getUser(),"user");
    this.generalNit=this.storageService.getUser()?.nit;
    this.idOrganizacion=this.storageService.getUser()?.id_organization
    //this.appComponent.footerActive=true;
    this.state=this.storageService.statePrincipal();

    if(this.state!=""){
      if(this.state=="downloadFiles"){
        this.downloadFiles=true;
        this.uploadFiles=false;
        this.home=false;
        this.CetificateService.getTypesCertificates().subscribe({
          next: data => {
            this.certificados=data;
            this.isLoaderShow=false;
            console.log(data);
          },
          error: err => {
            // this.errorMessage = err?.error?.message;
            // this.isLoginFailed = true;
            console.log(err?.error?.message);
            //*-----this.isLoaderShow=false;
            return;
          },
          complete: () => {
            this.isLoaderShow=false;
            console.log("Completado");
            this.isLoaderShow=false;
            return;
          }
        });
        this.OrganizationService.getAllOrganizations(this.generalNit||"").subscribe({
          next: data => {
            this.organizations=data;
            this.isLoaderShow=false;
            return;
          },
          error: err => {
            console.log(err?.error?.message);
            //*-----this.isLoaderShow=false;
            return;
          },
          complete: () => {
            this.isLoaderShow=false;
            console.log("Completado");
            this.isLoaderShow=false;
            return;
          }
        });
        //*-----this.isLoaderShow=false;
        this.CetificateService.allCertificatesByOrg("1").subscribe({
          next: data => {
            this.certificatesGenerated=data;
            //console.log(this.certificatesGenerated);
            //console.log(data);
          },
          error: err => {
            // this.errorMessage = err?.error?.message;
            // this.isLoginFailed = true;
            console.log(err?.error?.message);
          },complete: () => {
            this.isLoaderShow=false;
            console.log("Completado");
            this.isLoaderShow=false;
          }
        });

      }
      if(this.state=="uploadFiles"){
        this.downloadFiles=false;
        this.uploadFiles=true;
        this.home=false;
      }
      if(this.state=="home"){
        this.downloadFiles=false;
        this.uploadFiles=false;
        this.home=true;
      }
      this.isLoaderShow=false;
    }

    //this.retrieveTutorials();
    if (this.storageService?.isLoggedIn()) {
      //this.isLoggedIn = true;
      //this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/principal']);
    }else{
      this.router.navigate(['/landing']);
    }
    this.isLoaderShow=false;
  }
  onSubmit(): void {
    this.loader=true;
    this.fIleService.upLoadFIle(this.formData).subscribe({
      next: data => {
        // this.organizations=data;
        console.log(data,"DATA");
        if(data.code==200){
          this.loader=false;
        }
      },
      error: err => {
        console.log(err?.error?.message);
        this.loader=false;
      },
      complete: () => {
        console.log("Completado");
        this.loader=false;
      }
    }
    )
  }



  onSubmitGenerate(): void {
    //this.isLoaderShow=true;
    this.setLoaderShow();
    const {
      nit
    } = this.formGenerate;

    const tipo_retencion:string=String(this.typeCertSelected);
    const year_tribute =String(this.anioSelected);
    const idOrg=this.idOrganizacion;

    this.CetificateService.setCertificate(
      nit,
      tipo_retencion,
      year_tribute,
      idOrg)
      .subscribe({
        next: data => {


          if(data?.code!=200){
            console.log("Error: "+data?.message);
            this.setLoaderHide();
            this.snackBar.open(data?.message,"Cerrar");
            //this.loader=false;
          }else{
            console.log(data,"DATA");
            //this.setLoaderHide();

            this.snackBar.open(data?.message,"Cerrar").onAction().subscribe(() => {
              this.CetificateService.allCertificatesByOrg("1").subscribe({
                next: data => {
                  this.certificatesGenerated=data;
                  //console.log(this.certificatesGenerated);
                  //console.log(data);
                },
                error: err => {
                  // this.errorMessage = err?.error?.message;
                  // this.isLoginFailed = true;
                  console.log(err?.error?.message);
                },complete: () => {
                  this.isLoaderShow=false;
                  console.log("Completado");
                  this.isLoaderShow=false;
                }
              });
            });
          }

        },
        error: err => {
          console.log(err?.error?.message);
          this.snackBar.open(err?.error?.message,"Cerrar");
          //this.isLoaderShow=false;
        },
        complete: () => {
          console.log("Completado");
          this.setLoaderHide();

          //this.isLoaderShow=false;
        }
      });
      //this.isLoaderShow=false;
      //this.setLoaderHide();
  }

  selectedItemCert(select: MatListOption[]): void {
    this.certificateSelected=select[0].value;
    console.log(JSON.stringify(this.certificateSelected));
    //console.log(this.certificateSelected[0]);
  }

  // selectedItemCertSelect(): CertificatesGenerated {
  //   return null;
  //   //return new CertificateGenerateItem(this.certificateSelected[0]);
  // }
  changeTypeCert($event:any): void {
    console.log($event);
    this.typeCertSelected=$event;
    this.formGenerate.tipo_retencion=$event
  }

  changeAnioCert($event:any): void {
    console.log($event);
    this.anioSelected=$event;
    this.formGenerate.year_tribute=$event;
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
    this.storageService.setStatePrincipal("downloadFiles");
    this.isLoaderShow=false;
  }
  activeUploadFiles():void{
    this.downloadFiles=false;
    this.home=false;
    this.uploadFiles=true;
    this.storageService.setStatePrincipal("uploadFiles");
  }

  activeHome():void{
    this.downloadFiles=false;
    this.home=true;
    this.uploadFiles=false;
    this.storageService.setStatePrincipal("home");
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
