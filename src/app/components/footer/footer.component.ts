import { StorageService } from '../../services/storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit
{
  @Input() title?: string;
  public footerActive=false;
  currentIndex = -1;
  constructor(
    private storageService:StorageService,
    private router: Router) {}
  isLoggedIn = false;
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/principal']);
    }
  }

  getAssetsENV():string{
    return environment.assertsPath;
  }
  goToLogin($myParam: string = ''): void {
    const navigationDetails: string[] = ['/login'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(['/login']);
  }
}
