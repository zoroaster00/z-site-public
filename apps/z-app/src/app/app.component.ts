import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'z-site-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'z-app';
  shouldShowScrollBtn = false;

  constructor(private scroller: ViewportScroller) {}
  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
}
