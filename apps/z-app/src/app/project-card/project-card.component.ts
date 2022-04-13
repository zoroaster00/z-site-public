import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';

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
        title: this.translate.translate('project.p1.title'),
        summary: this.translate.translate('project.p1.description'),
        description: this.translate.translate('project.p1.description'),
        img: '',
        link: '',
      },
      {
        title: this.translate.translate('project.p2.title'),
        summary: this.translate.translate('project.p2.summary'),
        description: this.translate.translate('project.p2.description'),
        img: '',
        ytLink: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/TODO'
        ),
      },
    ];
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
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
