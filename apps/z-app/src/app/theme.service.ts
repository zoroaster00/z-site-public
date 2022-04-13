import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

const THEME_INDEX = 'Z_THEME';
const DARK_CLASS = 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private doc: Document) {
    if (this.isDarkSaved() || !(THEME_INDEX in localStorage)) {
      // is dark saved in local or theme not set
      this.displayTheme(true);
    } else {
      this.displayTheme(false);
    }
  }

  private saveTheme(isDark: boolean) {
    localStorage[THEME_INDEX] = isDark ? DARK_CLASS : 'light';
  }

  private isDarkSaved() {
    return localStorage[THEME_INDEX] === DARK_CLASS;
  }

  private displayTheme(isDark: boolean) {
    const htmlClass = this.doc.documentElement.classList;
    if (isDark) {
      htmlClass.add(DARK_CLASS);
    } else {
      htmlClass.remove(DARK_CLASS);
    }
  }

  toggleTheme() {
    if (this.doc.documentElement.classList.contains(DARK_CLASS)) {
      this.saveTheme(false);
      this.displayTheme(false);
    } else {
      this.saveTheme(true);
      this.displayTheme(true);
    }
  }
}
