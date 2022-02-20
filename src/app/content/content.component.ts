import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post, POST_DATABASE } from '../post-directory';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss', '../app.component.scss'],
})
export class ContentComponent implements OnInit {
  constructor(private _Activatedroute: ActivatedRoute) {
    
  }

  post_title: any;

  ngOnInit(): void {
    let raw_url = this._Activatedroute.snapshot.paramMap.get("id")
    this.post_title = decodeURI((raw_url ? raw_url : ""));
  }

  findPostByTitle(title: string): Post {
    return POST_DATABASE.filter(function(p) {
      return p.name == title;
    })[0];
  }
}
