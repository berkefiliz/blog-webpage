import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post, POST_DATABASE } from '../post-directory';

import { TEXTS_RAW } from './posts';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss', '../app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentComponent implements OnInit {
  constructor(private _Activatedroute: ActivatedRoute) {}

  post_title: any;
  TEXTS: any;

  ngOnInit(): void {
    let raw_url = this._Activatedroute.snapshot.paramMap.get('id');
    this.post_title = decodeURI(raw_url ? raw_url : '');
    this.TEXTS = TEXTS_RAW;
  }

  findPostByTitle(title: string): Post {
    return POST_DATABASE.filter(function (p) {
      return p.name == title;
    })[0];
  }
}
