import { UserService } from './../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit
{
  @Input() idUser?:string;
  @Input() names?: string;
  @Input() lastNames?: string;
  @Input() title?: string;
  @Input() orgAsociate?: string;
  @Input() nit?: string;
  public footerActive=false;
  currentIndex = -1;
  form: any = {
    namesUser:null,
    lastNameUser:null,
    passwordUser:null,
    confirmPasswordUser:null
  };
  //title = '';
  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private storageService:StorageService,
    private router: Router) {}
  isLoggedIn = false;
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      //this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/principal']);
    }
  }

  getAssetsENV():string{
    return environment.assertsPath;
  }

  // goToVotes($myParam: string = ''): void {
  //   const navigationDetails: string[] = ['/votes'];
  //   if($myParam.length) {
  //     navigationDetails.push($myParam);
  //   }
  //   this.router.navigate(navigationDetails);
  // }
  goToLogin($myParam: string = ''): void {
    const navigationDetails: string[] = ['/login'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    const
    {namesUser,
      lastNameUser,
      passwordUser,
      confirmPasswordUser}=this.form;
    if(passwordUser===confirmPasswordUser){
      this.userService.updateUser(
        Number(this.idUser),
        namesUser,
        lastNameUser,
        passwordUser,
        ).subscribe({
          next: data => {
            // this.certificados=data;
            //this.isLoaderShow=false;
            //console.log(data);
            if(data?.status ===200){
              this._snackBar.open("Usuario actualizado con exito!","Cerrar");
            }

          },
          error: err => {
            // this.errorMessage = err?.error?.message;
            // this.isLoginFailed = true;
            //console.log(err);


            console.error('There was an error!', err);
            this._snackBar.open(err?.message+" \n "+JSON.stringify(err?.error),"Cerrar");
            //console.log(err.message);
            //*-----this.isLoaderShow=false;
            return;
          },
          complete: () => {
            //this.isLoaderShow=false;
            ////console.log("Completado");
            //this.isLoaderShow=false;
            return;
          }
        });
    } else{
      this._snackBar.open("Error: Las contraseñas no coinciden!","Cerrar");
    }
    // this.userService.updateUser(
    //   Number(this.idUser),
    //   namesUser,
    //   lastNameUser,
    //   passwordUser,
    //   ).subscribe({
    //     next: data => {
    //       // this.certificados=data;
    //       //this.isLoaderShow=false;
    //       //console.log(data);
    //       if(data?.status ===200){
    //         this._snackBar.open("Usuario actualizado con exito!","Cerrar");
    //       }

    //     },
    //     error: err => {
    //       // this.errorMessage = err?.error?.message;
    //       // this.isLoginFailed = true;
    //       //console.log(err);


    //       console.error('There was an error!', err);
    //       this._snackBar.open(err?.message+" \n "+JSON.stringify(err?.error),"Cerrar");
    //       //console.log(err.message);
    //       //*-----this.isLoaderShow=false;
    //       return;
    //     },
    //     complete: () => {
    //       //this.isLoaderShow=false;
    //       ////console.log("Completado");
    //       //this.isLoaderShow=false;
    //       return;
    //     }
    //   });

  }
  // retrieveTutorials(): void {
  //   this.tutorialService.getAll().subscribe({
  //     next: (data) => {
  //       this.tutorials = data;
  //       //console.log(data);
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

  // refreshList(): void {
  //   this.retrieveTutorials();
  //   this.currentTutorial = {};
  //   this.currentIndex = -1;
  // }

  // setActiveTutorial(tutorial: Tutorial, index: number): void {
  //   this.currentTutorial = tutorial;
  //   this.currentIndex = index;
  // }

  // removeAllTutorials(): void {
  //   this.tutorialService.deleteAll().subscribe({
  //     next: (res) => {
  //       //console.log(res);
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
  //       //console.log(data);
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }
}
