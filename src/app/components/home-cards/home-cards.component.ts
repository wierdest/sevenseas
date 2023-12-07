import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ScreenSizeService } from '../../services/screen-size.service';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Tenants } from '../../models/tenants.model';

@Component({
  selector: 'app-home-cards',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatIconModule, DragDropModule, MatRippleModule, MatButtonModule,],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.css'
})
export class HomeCardsComponent {
  tiles: any[] = [];
  tilesTypes = Tenants.getTenants();

  private grid = {
    wide: { cols: 1, rows: 2 },
    narrow: { cols: 2 , rows: 2 },
    tooNarrow: { cols:7, rows: 2 }
  }
  private buildGridList(typeList: any[], size: string): any[] {
    return typeList.map(type => {
      return { type, ...this.getGridConfigSize(size), flipped: false, flipDirection: "forward", placeholder: false, dragging: false };
    });
  }
 
  private getGridConfigSize(size: string) : any {
    if(size === 'wide') {
      return this.grid.wide;
    } else if (size === 'narrow') {
      return this.grid.narrow;
    } else {
      return this.grid.tooNarrow;
    }
  }

  private WIDE = this.buildGridList(this.tilesTypes, 'wide');

  private NARROW = this.buildGridList(this.tilesTypes, 'narrow');

  private TOO_NARROW = this.buildGridList(this.tilesTypes, 'tooNarrow');

  drop(event: CdkDragDrop<any[]>): void {
    event.event.stopPropagation();
    const draggedData = event.item.data;
    const draggedIndex = event.currentIndex;
    // Use moveItemInArray to switch items in the array
    moveItemInArray(this.tiles, event.previousIndex, draggedIndex);
  }

  currentScreenSize: string = '';
  private destroyed = new Subject<void>();
  constructor(private screenSizeService: ScreenSizeService) {
    this.screenSizeService.currentScreenSize$
      .pipe(takeUntil(this.destroyed))
      .subscribe(size => {
        this.currentScreenSize = size;
        // Do any additional logic based on the screen size change
        if(this.currentScreenSize === 'XSmall') {
          this.tiles = this.TOO_NARROW;
        
        } else if (this.currentScreenSize === 'Small') {
          this.tiles = this.NARROW;
       
        } else {
          this.tiles = this.WIDE;
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  flipCard(event: Event, index: number): void {
    event.stopPropagation();
  
    this.tiles = this.tiles.map((t, i) => ({
      ...t,
      flipped: i === index ? !t.flipped : t.flipped,
      flipDirection: i === index ? (!t.flipped ? 'forward' : 'backward') : t.flipDirection,
    }));
  }

}
