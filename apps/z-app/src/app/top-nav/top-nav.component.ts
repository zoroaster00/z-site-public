import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'z-site-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  constructor(
    private theme: ThemeService,
    private translate: TranslocoService,
    private scroller: ViewportScroller
  ) {}

  toShowTranslateMenu = false;

  ngOnInit(): void {}

  clickTheme() {
    this.theme.toggleTheme();
  }

  openMenu(ev: Event) {
    this.toShowTranslateMenu = true;
    ev.stopPropagation();
  }

  closeMenu() {
    this.toShowTranslateMenu = false;
  }

  @HostListener('document:click')
  clickOut() {
    this.closeMenu();
  }

  changeLang(lang: 'en' | 'zh_TW') {
    this.translate.setActiveLang(lang);
  }

  scrollToAnchor(anchor: string) {
    this.scroller.scrollToAnchor(anchor);
  }
}
