import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card';

import { ScreenSizeService } from '../../services/screen-size.service';

import { HomeCardsComponent } from '../home-cards/home-cards.component';
import { ThreeDComponent } from '../three-d/three-d.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, RouterModule, 
    MatSidenavModule, MatToolbarModule, 
    MatIconModule, MatButtonModule, 
    MatDividerModule, MatCardModule,
    HomeCardsComponent, ThreeDComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  toolbarSentence = "Seven seas ~ learn ~ from  ~ your ~ compass."

  currentScreenSize: string = '';
  private destroyed = new Subject<void>();

  constructor(private screenSizeService: ScreenSizeService) {
    this.screenSizeService.currentScreenSize$
      .pipe(takeUntil(this.destroyed))
      .subscribe(size => {
        this.currentScreenSize = size;
        // Do any additional logic based on the screen size change
        console.log(this.currentScreenSize);
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }


}
