import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { RouterModule } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { ProjectCardComponent } from './project-card/project-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavComponent,
    TimelineComponent,
    ProjectCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslocoRootModule,
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
    AnimateOnScrollModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
