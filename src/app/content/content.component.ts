import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post, POST_DATABASE } from '../post-directory';

import { TEXTS_RAW } from './posts';

import { faBackward, faShareNodes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss', '../app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  post_title: any;
  TEXTS: any;

  // Icons
  faBackward = faBackward;
  faShareNodes = faShareNodes;

  ngOnInit(): void {
    this.TEXTS = TEXTS_RAW;

    this.route.queryParams.subscribe((params) => {
      this.post_title = decodeURI(params['title']);
    });
  }

  findPostByTitle(title: string): Post {
    return POST_DATABASE.filter(function (p) {
      return p.name == title;
    })[0];
  }
}
