import { StorageService } from '../../services/storage.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'Loading',
  templateUrl: './_loading.component.html',
  styleUrls: ['./_loading.component.css'],
})
export class LoadingComponent implements OnInit
{
  @Input() value : number = 100;
  @Input() diameter: number = 100;
  @Input() mode : ProgressSpinnerMode = 'indeterminate';
  @Input() strokeWidth : number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";
  //@Input('title') title?: string;

  // color = 'primary';
  // mode = 'Indeterminate';
  // value = 50;

  public footerActive=false;
  currentIndex = -1;
  //title = '';
  constructor(
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
