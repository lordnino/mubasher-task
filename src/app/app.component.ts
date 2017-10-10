import { PostsService } from './posts.service';
import { Component } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  page: any;
  size: any;
  posts: any;
  m = moment();
  enableInfinite: boolean = true;
  getPostsOnScroll: any = true;

  constructor(public postsService: PostsService) {
    this.page = 1;
    this.size = 2;
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts(this.page, this.size).subscribe(data => {
      console.log(data);
      this.posts = data;
      this.posts.forEach(post => {
        let day = this.m.locale("ar");
        post.postTime = day.fromNow(post.postTime);
      })
    }, err => console.log(err));
  }

  onScroll() {
    console.log('bottom rock');
    this.enableInfinite = false;
    this.page++;
    this.size += 2;
    console.log(this.page);
    if(this.getPostsOnScroll){
      this.postsService.getPosts(this.page, this.size).subscribe(data => {
        if(data.length == 0){
          this.getPostsOnScroll = false;
        }
        console.log(data);
        this.posts = this.posts.concat(data);
        console.log(this.posts);
      }, err => console.log(err)
        , () => {
          this.enableInfinite = true;
        });
    }
  }

}
