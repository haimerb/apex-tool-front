import { OrganizationService } from './../../services/organization.service';
import { AppComponent } from './../../app.component';
import { Component, Input, OnInit, OnChanges,ViewChild,AfterViewInit, DoCheck, SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment.development';
import { CertificateService } from '../../services/certificate.service';

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

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})

export class Principal implements OnInit {
  idLoader=false;
  generalNit?: string;
  footerActive=false;
  state="";
  downloadFiles = false;
  uploadFiles=false;
  home=false;
  loader=false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  // certificados: Centificado[] = [
  //   {value: '0', viewValue: 'Certificado de Retención sobre IVA'},
  //   {value: '1', viewValue: 'Certificado de Retención en la fuente'},
  //   {value: '2', viewValue: 'Tacos'},
  // ];
  //   organizations: Centificado[] = [
  //   {value: '0', viewValue: 'Certificado de Retención sobre IVA'},
  //   {value: '1', viewValue: 'Certificado de Retención en la fuente'},
  //   {value: '2', viewValue: 'Tacos'},
  // ];
   anio: Anio[] = [
    {value: '0', viewValue: '2020'},
    {value: '0', viewValue: '2021'},
    {value: '0', viewValue: '2022'},
    {value: '0', viewValue: '2023'},
  ];
  certificados?: Centificado[];
  organizations?: Organization[];
  //tutorials?: Tutorial[];
  //currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  constructor(
    // private tutorialService: TutorialService,
    private OrganizationService: OrganizationService,
    private CetificateService : CertificateService,
    private AuthService: AuthService,
    private router: Router,
    private storageService: StorageService,
    //private appComponent: AppComponent
  ) {}
  // ngDoCheck(): void {
  //   this.generalNit=this.storageService.getUser()?.nit;
  //   this.state=this.storageService.statePrincipal();
  //   if(this.state!=""){
  //     this.idLoader=true;
  //     if(this.state=="downloadFiles"){
  //       this.downloadFiles=true;
  //       this.uploadFiles=false;
  //       this.home=false;
  //       this.CetificateService.getTypesCertificates().subscribe({
  //         next: data => {
  //           this.certificados=data;
  //           this.idLoader=false;
  //         },
  //         error: err => {
  //           console.log(err?.error?.message);
  //         }
  //       });
  //       this.OrganizationService.getAllOrganizations(this.generalNit||"").subscribe({
  //         next: data => {
  //           this.organizations=data;
  //         },
  //         error: err => {
  //           console.log(err?.error?.message);
  //           this.idLoader=false;
  //         }
  //       });
  //       this.idLoader=false;
  //     }
  //     if(this.state=="uploadFiles"){
  //       this.downloadFiles=false;
  //       this.uploadFiles=true;
  //       this.home=false;
  //     }
  //     if(this.state=="home"){
  //       this.downloadFiles=false;
  //       this.uploadFiles=false;
  //       this.home=true;
  //     }

  //   }
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.generalNit=this.storageService.getUser()?.nit;
  //   this.state=this.storageService.statePrincipal();
  //   if(this.state!=""){
  //     this.idLoader=true;
  //     if(this.state=="downloadFiles"){
  //       this.downloadFiles=true;
  //       this.uploadFiles=false;
  //       this.home=false;
  //       this.CetificateService.getTypesCertificates().subscribe({
  //         next: data => {
  //           this.certificados=data;
  //           this.idLoader=false;
  //         },
  //         error: err => {
  //           console.log(err?.error?.message);
  //         }
  //       });
  //       this.OrganizationService.getAllOrganizations(this.generalNit||"").subscribe({
  //         next: data => {
  //           this.organizations=data;
  //         },
  //         error: err => {
  //           console.log(err?.error?.message);
  //           this.idLoader=false;
  //         }
  //       });
  //       this.idLoader=false;
  //     }
  //     if(this.state=="uploadFiles"){
  //       this.downloadFiles=false;
  //       this.uploadFiles=true;
  //       this.home=false;
  //     }
  //     if(this.state=="home"){
  //       this.downloadFiles=false;
  //       this.uploadFiles=false;
  //       this.home=true;
  //     }

  //   }
  // }

  ngOnInit(): void {
    console.log(this.storageService.getUser(),"user");
    this.generalNit=this.storageService.getUser()?.nit;

    //this.appComponent.footerActive=true;
    this.state=this.storageService.statePrincipal();

    if(this.state!=""){
      this.idLoader=true;
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
            this.idLoader=false;
          }
        });
        this.OrganizationService.getAllOrganizations(this.generalNit||"").subscribe({
          next: data => {
            this.organizations=data;
          },
          error: err => {
            console.log(err?.error?.message);
            this.idLoader=false;
          }
        });
        this.idLoader=false;
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


    //this.retrieveTutorials();
    if (this.storageService?.isLoggedIn()) {
      //this.isLoggedIn = true;
      //this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/principal']);
    }else{
      this.router.navigate(['/landing']);
    }
  }



  getAssetsENV():string{
    return environment.assertsPath;
  }

  activeDownloadFiles():void{
    this.downloadFiles=true;
    this.home=false;
    this.uploadFiles=false;
    this.storageService.setStatePrincipal("downloadFiles");
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
  retrieveTutorials(): void {
    // this.tutorialService.getAll().subscribe({
    //   next: (data) => {
    //     this.tutorials = data;
    //     console.log(data);
    //   },
    //   error: (e) => console.error(e)
    // });
  }

  refreshList(): void {
    this.retrieveTutorials();
    //this.currentTutorial = {};
    this.currentIndex = -1;
  }

  // setActiveTutorial(tutorial: Tutorial, index: number): void {
  //   this.currentTutorial = tutorial;
  //   this.currentIndex = index;
  // }

  // removeAllTutorials(): void {
  //   this.tutorialService.deleteAll().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.refreshList();
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

  // searchTitle(): void {
  //   this.currentTutorial = {};
  //   this.currentIndex = -1;

  //   this.tutorialService.findByTitle(this.title).subscribe({
  //     next: (data) => {
  //       this.tutorials = data;
  //       console.log(data);
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }
}
