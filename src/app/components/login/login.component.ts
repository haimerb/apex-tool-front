import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
    private AuthService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/principal']);
    }
  }

  onSubmit(): void {
    this.idLoader=true;
    const {
      email,
      password } = this.form;

    this.AuthService.login(
      email,
      password).subscribe({
      next: data => {
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
      }
    });

  }

  reloadPage(): void {
    window?.location?.reload();
  }
}
