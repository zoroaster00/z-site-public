import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'z-site-project-card',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent implements OnInit {
  projects: { title: string; description: string; img: string }[] = [];
  constructor() {}

  ngOnInit(): void {
    this.projects = [
      { title: 'P1', description: 'dddd', img: '/sdfs' },
      { title: 'P1', description: 'dddd', img: '/sdfs' },
      { title: 'P1', description: 'dddd', img: '/sdfs' },
    ];
  }
}
