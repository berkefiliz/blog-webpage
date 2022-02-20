import { Component, OnInit } from '@angular/core';
import { Post, POST_DATABASE } from '../post-directory';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../app.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  POSTS: Post[] = []

  ngOnInit(): void {
    this.POSTS = POST_DATABASE;
  }

  make_url(input: string): string {
    return encodeURI(input)
  }
}
