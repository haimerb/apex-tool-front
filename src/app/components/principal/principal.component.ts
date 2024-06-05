import { AppComponent } from './../../app.component';
import { Component, Input, OnInit, ViewChild,AfterViewInit  } from '@angular/core';
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

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})

export class Principal implements OnInit {
  footerActive=false;
  state="";
  downloadFiles = false;
  uploadFiles=false;
  inicio=false;
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
   anio: Anio[] = [
    {value: '0', viewValue: '2020'},
    {value: '0', viewValue: '2021'},
    {value: '0', viewValue: '2022'},
    {value: '0', viewValue: '2023'},
  ];
  certificados?: Centificado[];
  //tutorials?: Tutorial[];
  //currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  constructor(
    // private tutorialService: TutorialService,
    private CetificateService : CertificateService,
    private AuthService: AuthService,
    private router: Router,
    private storageService: StorageService,
    //private appComponent: AppComponent
  ) {}

  ngOnInit(): void {

    //this.appComponent.footerActive=true;
    this.state=this.storageService.statePrincipal();

    if(this.state!=""){
      if(this.state=="downloadFiles"){
        this.downloadFiles=true;
        this.uploadFiles=false;
        this.inicio=false;
        this.CetificateService.getTypesCertificates().subscribe({
          next: data => {
            this.certificados=data;
          },
          error: err => {
            // this.errorMessage = err?.error?.message;
            // this.isLoginFailed = true;
            console.log(err?.error?.message);
          }
        });
      }
      if(this.state=="uploadFiles"){
        this.downloadFiles=false;
        this.uploadFiles=true;
        this.inicio=false;
      }
      if(this.state=="inicio"){
        this.downloadFiles=false;
        this.uploadFiles=false;
        this.inicio=true;
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
    this.uploadFiles=false;
    this.storageService.setStatePrincipal("downloadFiles");
  }
  activeUploadFiles():void{
    this.downloadFiles=false;
    this.uploadFiles=true;
    this.storageService.setStatePrincipal("uploadFiles");
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
