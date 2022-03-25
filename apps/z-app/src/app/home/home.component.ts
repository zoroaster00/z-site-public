import { ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { fromEvent, ReplaySubject, Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'z-site-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('container', { read: ElementRef })
  private container!: QueryList<ElementRef>;
  private anchorObs: ReplaySubject<string> = new ReplaySubject<string>(1);
  private destroy$ = new Subject();

  @Output('scrollToTop') scrollToTop = new EventEmitter<boolean>();

  constructor(router: Router, private scroller: ViewportScroller) {
    router.events
      .pipe(
        filter((e) => e instanceof Scroll),
        takeUntil(this.destroy$)
      )
      .subscribe((e) => {
        const anchor = (e as Scroll).anchor;
        if (anchor) {
          this.anchorObs.next(anchor);
        }
      });
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroy$), debounceTime(100))
      .subscribe((e) => {
        // console.log(e);
        const containerDiv: HTMLElement = this.container?.first?.nativeElement;
        if (!containerDiv) {
          return;
        }

        if (containerDiv.getBoundingClientRect().top < containerDiv.offsetTop) {
          // show back to top button if scroll exists
          this.scrollToTop.emit(true);
        } else {
          // hide button
          this.scrollToTop.emit(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    this.anchorObs.complete();
  }

  ngAfterViewInit(): void {
    this.container.changes
      .pipe(
        tap(() => {
          const containerDiv: HTMLElement =
            this.container?.first?.nativeElement;
          this.scroller.setOffset([0, containerDiv?.offsetTop]);
        }),
        switchMap(() => this.anchorObs)
      )
      .subscribe((anchor) => {
        this.scroller.scrollToAnchor(anchor);
      });
  }
}
