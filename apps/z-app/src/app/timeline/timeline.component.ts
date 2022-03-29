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
        title: this.translate.translate('title.experience'),
        atTime: 'sdasd',
        description: 'des',
      },
      { title: 't1', atTime: 'sdasd', description: 'des' },
    ];
  }
}
