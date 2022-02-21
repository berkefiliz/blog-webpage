import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post, POST_DATABASE } from '../post-directory';
import { TEXTS_RAW } from './posts';

import {
  faAsterisk,
  faBackward,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss', '../app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipboardApi: ClipboardService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.post_title = params['title'].split("_").join(" ");
    });
  }

  post_title: any;
  TEXTS: any;
  copied: boolean = false;

  // Icons
  faBackward = faBackward;
  faShareNodes = faShareNodes;
  faAsterisk = faAsterisk;

  ngOnInit(): void {
    this.TEXTS = TEXTS_RAW;
  }

  findPostByTitle(title: string): Post {
    return POST_DATABASE.filter(function (p) {
      return p.name == title;
    })[0];
  }

  async copyLink(): Promise<void> {
    this.copied = true;
    this.clipboardApi.copyFromContent('blog.berkefiliz.com' + this.router.url);
    await new Promise((f) => setTimeout(f, 2000));
    this.copied = false;
  }
}
