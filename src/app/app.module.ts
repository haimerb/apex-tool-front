import { environment } from './../environments/environment.development';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Landing } from './components/landing/landing.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { Principal } from './components/principal/principal.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { FileSaverModule } from 'ngx-filesaver';
import { LoadingComponent } from './components/_loading/_loading.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ProfileComponent } from './components/profile/profile.component';
import {MatDialogModule} from '@angular/material/dialog';

import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { NgOptimizedImage } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    Landing,
    LoginComponent,
    Principal,
    HomeComponent,
    FooterComponent,
    LoadingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatSelectModule,
    MatListModule,
    NgxMatFileInputModule,
    FileSaverModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepicker,
    MatDatepickerModule,
    MatRippleModule,
    NgOptimizedImage
  ],
  exports: [MatButtonModule,FormsModule],
  providers: [
    provideAnimationsAsync(),
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    provideMomentDateAdapter(MY_FORMATS),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
