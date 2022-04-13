import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'z-site-timeline',
  templateUrl: './timeline.component.html',
})
export class TimelineComponent implements OnInit {
  timelineNodes!: { title: string; atTime: string; description: string }[];
  constructor(private translate: TranslocoService) {}

  ngOnInit(): void {
    this.timelineNodes = [
      {
        title: this.translate.translate('exp.e0.title'),
        atTime: this.translate.translate('exp.e0.atTime'),
        description: this.translate.translate('exp.e0.description'),
      },
      {
        title: this.translate.translate('exp.e1.title'),
        atTime: this.translate.translate('exp.e1.atTime'),
        description: this.translate.translate('exp.e1.description'),
      },
      {
        title: this.translate.translate('exp.e2.title'),
        atTime: this.translate.translate('exp.e2.atTime'),
        description: this.translate.translate('exp.e2.description'),
      },
      {
        title: this.translate.translate('exp.e3.title'),
        atTime: this.translate.translate('exp.e3.atTime'),
        description: this.translate.translate('exp.e3.description'),
      },
    ];
  }
}
