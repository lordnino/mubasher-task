import { PostsService } from './posts.service';
import { Component } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  page: any; // number of the page you need to retrieve from the server
  size: any; // size of the posts you need to get in each request to the server
  posts: any; // array the holds all the posts
  m = moment(); // instance of moment library
  getPostsOnScroll: any = true; // this varibale determine whether to send a request to the server on scroll or no

  constructor(public postsService: PostsService) {
    this.page = 1;
    this.size = 3;
  }

  ngOnInit() {
    this.getPosts();
  }

  /*
    - this method responsible for calling the service to get the posts.
    - this is a wrapper over getPosts method from postsService service and we pass two parameter the page, and the size
  */
  getPosts() {
    this.postsService.getPosts(this.page, this.size).subscribe(data => {
      console.log(data);
      this.posts = data;
      this.formatPostTime();
    }, err => console.log(err));
  }

  /*
    This method is only responsible for formating the time and translate it to arabic using moment library
  */
  formatPostTime(){
    this.posts.forEach(post => {
      let day = this.m.locale("ar");
      post.postTime = day.fromNow(post.postTime);
    })
  }

  /*
    - This function get triggred when infiniteScroll even fire.
    - We call The getPosts method from the postsService, retrive data and then join the data to posts array
  */
  onScroll() {
    this.page++; // Here we increment the page number every time before calling the back end point
    this.size += 2; // Here we increasing the size of the posts by 2 before calling the back end point
    if(this.getPostsOnScroll){
      this.postsService.getPosts(this.page, this.size).subscribe(data => {
        if(data.length == 0){
          // Here we disable the getPostsONScroll variable whenever we get 0 posts 
          // This actually improve the code performance since we will not call the server again if we get 0 posts 
          this.getPostsOnScroll = false;
        }
        this.posts = this.posts.concat(data); // Here we just concating the data we got from the back end point with the posts array
        this.formatPostTime();
      }, err => console.log(err));
    }
  }

}
