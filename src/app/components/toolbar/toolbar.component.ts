import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ScreenSizeService } from '../../services/screen-size.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule, RouterModule,
    MatIconModule, MatButtonModule, 
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnDestroy {
  toolbarLongSentence = "Seven seas ~ learn ~ from  ~ your ~ compass."
  toolbarShortSentence = "7 Cs: find your compass."

  currentScreenSize: string = '';
  private destroyed = new Subject<void>();

  @Output() drawerToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  onDrawerToggleClick() {
    // Emit an event to notify the parent component to toggle the drawer
    this.drawerToggle.emit(true);
  }
}
