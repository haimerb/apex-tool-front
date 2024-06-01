import { Component, OnInit } from '@angular/core';
//import { Tutorial } from 'src/app/models/tutorial.model';
//import { TutorialService } from 'src/app/services/tutorial.service';

// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatIconModule} from '@angular/material/icon';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatButtonModule} from '@angular/material/button';

// import {MatIconModule} from '@angular/material/icon';
// import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { Router } from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class Landing
//implements OnInit
{
  //tutorials?: Tutorial[];
  //currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  constructor(
    //private tutorialService: TutorialService,
    private router: Router) {}

  // ngOnInit(): void {
  //   this.retrieveTutorials();
  // }

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
  //       console.log(data);
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
