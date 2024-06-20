
import { FIleService } from './../../services/file.service';
import { OrganizationService } from './../../services/organization.service';
import { AppComponent } from './../../app.component';
import { Component, Input, OnInit, OnChanges,ViewChild,AfterViewInit, DoCheck, SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment.development';
import { CertificateService } from '../../services/certificate.service';
import { FormControl,Validators } from '@angular/forms';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import { MatListOption } from '@angular/material/list';
import { CertificateGenerateItem } from '../../models/certificateGenerate.model';
import { FileSaverModule } from 'ngx-filesaver';
import FileSaver from 'file-saver';

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
  options: any = {
    autoBom: false,
  };
  certificateSelected?:CertificateGenerateItem;
  files: any[]=[];
  maxSize= 16;
  //fileControl?: FormControl;
  fileControl = new FormControl('', [Validators.required,MaxSizeValidator(this.maxSize * 1024)]);

  form: any = {
    uploadfile: null
  };
  noChangeCount=0;
  changeDetected = false;
  changeLog=new Array<string>();
  idLoader=false;
  generalNit?: string;
  footerActive=false;
  state="";
  downloadFiles = false;
  oldDownloadFiles = false;
  uploadFiles=false;
  home=false;
  loader=false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

   anio: Anio[] = [
    {value: '0', viewValue: '2020'},
    {value: '0', viewValue: '2021'},
    {value: '0', viewValue: '2022'},
    {value: '0', viewValue: '2023'},
  ];
  certificados?: Centificado[];
  organizations?: Organization[];
  certificatesGenerated?: CertificatesGenerated[];
  currentIndex = -1;
  title = '';
  constructor(
    private fIleService : FIleService,
    private OrganizationService: OrganizationService,
    private CetificateService : CertificateService,
    private AuthService: AuthService,
    private router: Router,
    private storageService: StorageService,
  ) {
    this.home =true;
    // this.fileControl = new FormControl(this.files, [
    //   Validators.required,
    //   MaxSizeValidator(this.maxSize * 1024)
    // ])
  }

  ngDoCheck(): void {

    if (this.downloadFiles!== this.oldDownloadFiles) {
      this.idLoader=true;
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Hero name changed to "${this.downloadFiles}" from "${this.oldDownloadFiles}"`);
      this.oldDownloadFiles = this.downloadFiles;
      this.generalNit=this.storageService.getUser()?.nit;
      this.state=this.storageService.statePrincipal();

      if(this.state!=""){

        if(this.state=="downloadFiles"){
          this.downloadFiles=true;
          this.uploadFiles=false;
          this.home=false;
          this.CetificateService.getTypesCertificates().subscribe({
            next: data => {
              this.certificados=data;
            },
            error: err => {
              // this.errorMessage = err?.error?.message;
              // this.isLoginFailed = true;
              console.log(err?.error?.message);
            },complete: () => {
              this.idLoader=false;
              console.log("Completado");
              this.idLoader=false;
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
              this.idLoader=false;
              console.log("Completado");
              this.idLoader=false;
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
              this.idLoader=false;
              console.log("Completado");
              this.idLoader=false;
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
    this.idLoader=false;
  }
  ngOnInit(): void {
    this.fileControl?.valueChanges.subscribe((files: any) => {
      console.log(files,"FILES");
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    })
    this.idLoader=true;
    console.log(this.storageService.getUser(),"user");
    this.generalNit=this.storageService.getUser()?.nit;

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
            this.idLoader=false;
          },
          error: err => {
            // this.errorMessage = err?.error?.message;
            // this.isLoginFailed = true;
            console.log(err?.error?.message);
            //*-----this.idLoader=false;
            return;
          },
          complete: () => {
            this.idLoader=false;
            console.log("Completado");
            this.idLoader=false;
            return;
          }
        });
        this.OrganizationService.getAllOrganizations(this.generalNit||"").subscribe({
          next: data => {
            this.organizations=data;
            this.idLoader=false;
            return;
          },
          error: err => {
            console.log(err?.error?.message);
            //*-----this.idLoader=false;
            return;
          },
          complete: () => {
            this.idLoader=false;
            console.log("Completado");
            this.idLoader=false;
            return;
          }
        });
        //*-----this.idLoader=false;
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
            this.idLoader=false;
            console.log("Completado");
            this.idLoader=false;
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
      this.idLoader=false;
    }

    //this.retrieveTutorials();
    if (this.storageService?.isLoggedIn()) {
      //this.isLoggedIn = true;
      //this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/principal']);
    }else{
      this.router.navigate(['/landing']);
    }
    this.idLoader=false;
  }

  onSubmit(): void {



    console.log("onSubmit");
    //console.log(this.fileUpload.valueChanges);
    console.log(this.fileControl.value,"VALUE");
    console.log(this.files,"FILES2");


    let  formData: any = new FormData();
         formData.append('uploadFile', this.fileControl.value);

    this.fIleService.upLoadFIle(formData).subscribe({
      next: data => {
        // this.organizations=data;
        console.log(data,"DATA");
      },
      error: err => {
        console.log(err?.error?.message);
      },
      complete: () => {
        console.log("Completado");
      }
    }
    )
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

  decargar():void {
    window.open(`${environment.downloadPathApi}${this.certificateSelected?.url_assoc_file}`, '_blank');
  }

  getAssetsENV():string{
    return environment.assertsPath;
  }

  activeDownloadFiles():void{
    this.idLoader=true;
    this.downloadFiles=true;
    this.home=false;
    this.uploadFiles=false;
    this.storageService.setStatePrincipal("downloadFiles");
    this.idLoader=false;
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
}
