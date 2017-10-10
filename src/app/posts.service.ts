import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostsService {

  url: string = 'http://136.243.57.153:8080/api/';

  constructor(private http: Http) { }

  getPosts(page, size){
    return this.http.get(`${this.url}posts?page=${page}&size=${size}&sort=id,asc`).map(res => res.json());
  }

}
 