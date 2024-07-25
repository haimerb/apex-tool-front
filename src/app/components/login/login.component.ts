import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoaderShow?:boolean;
  isCentrematRipple=true;
  statePrincipal="";
  idLoader=false;
  emailFormControl = new FormControl('', [Validators.required]);
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private AuthService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private appcomponent: AppComponent
  ) {
    this.isLoggedIn = false;
  }

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
  onSubmit(): void {
    this.idLoader=true;
    this.setLoaderShow();
    const {
      email,
      password
    } = this.form;
    this.AuthService.login(
      email,
      password

    ).subscribe({
      next: data => {
        //console.log(data?.code);

        if(data?.code!=200){
          this.isLoginFailed = true;
          this.isLoggedIn = false;
          this.idLoader=false;
          this.errorMessage="Error Login: Usuario, email o contraseña incorrecta";
          this._snackBar.open(this.errorMessage,"Cerrar");
          return;
        }

        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.storageService?.getUser().roles;
        //this.reloadPage();
        this.idLoader=false;
        this.router?.navigate(['/principal']);
      },
      error: err => {
        this.errorMessage = err?.error?.message;
        this.isLoginFailed = true;
        this.isLoginFailed = false;
      }
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

  reloadPage(): void {
    window?.location?.reload();
  }
}
