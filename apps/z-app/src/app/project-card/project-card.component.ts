import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { Subject, takeUntil } from 'rxjs';

interface Project {
  title: string;
  summary: string;
  description: string;
  img: string;
  link?: string;
  ytLink?: SafeResourceUrl;
}

@Component({
  selector: 'z-site-project-card',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent implements OnInit, OnDestroy, AfterViewInit {
  projects: Project[] = [];
  projectInDetails?: Project;

  @ViewChild('modalToggle') modalToggle!: ElementRef;
  @ViewChild('projectDetailsModal') modal!: ElementRef;

  private observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.type === 'attributes' && m.oldValue?.includes('block')) {
        // modal closed, set projectInDetails to empty
        // so iframe can be reset as well
        this.projectInDetails = undefined;
      }
    });
  });

  private destroy$ = new Subject();

  constructor(
    private translate: TranslocoService,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit(): void {
    this.observer.observe(this.modal?.nativeElement, {
      attributeFilter: ['style'],
      attributeOldValue: true,
    });
  }

  ngOnInit(): void {
    this.projects = [
      {
        title: this.translate.translate('project.langExt.title'),
        summary: this.translate.translate('project.langExt.description'),
        description: this.translate.translate('project.langExt.description'),
        img: '/assets/img/search-ext.jpg',
        link: 'https://chrome.google.com/webstore/detail/google-search-with-langua/fgmckmbejhgjokoceblcilmhpgehfgkf',
      },
      {
        title: this.translate.translate('project.lineBot.title'),
        summary: this.translate.translate('project.lineBot.summary'),
        description: this.translate.translate('project.lineBot.description'),
        img: '/assets/img/line-bot.png',
        link: 'https://github.com/zoroaster00/page-wait-helper',
      },
      {
        title: this.translate.translate('project.gameDemo.title'),
        summary: this.translate.translate('project.gameDemo.summary'),
        description: this.translate.translate('project.gameDemo.description'),
        img: '/assets/img/game-demo.png',
        ytLink: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/omNXpG4fo1g'
        ),
      },
      {
        title: this.translate.translate('project.antDemo.title'),
        summary: this.translate.translate('project.antDemo.summary'),
        description: this.translate.translate('project.antDemo.description'),
        img: '/assets/img/ant-demo.png',
        ytLink: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/yEAKAAIBzFk'
        ),
      },
    ];
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
    this.destroy$.next({});
    this.destroy$.complete();
  }

  goToLink(link: string | undefined) {
    if (link) {
      window.open(link, '__blank');
    }
  }

  showModal(project: Project) {
    this.projectInDetails = project;
    (this.modalToggle?.nativeElement as HTMLElement)?.click();
  }
}
