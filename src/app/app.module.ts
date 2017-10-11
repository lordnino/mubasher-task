import { PostsService } from './posts.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InfiniteScrollModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
