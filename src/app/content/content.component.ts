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
      let error = 'Post not found!';
      if (params['title']) {
        this.post_title = params['title'].split('_').join(' ');
        if (
          this.findPostByTitle(this.post_title) == this.findPostByTitle(error)
        ) {
          this.post_title = error;
        }
      } else {
        {
          this.post_title = error;
        }
      }
    });
  }

  post_title: string = '';
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
    let filtered: Post[] = POST_DATABASE.filter(function (p) {
      return p.name == title;
    });
    return filtered.length > 0 ? filtered[0] : POST_DATABASE[0];
  }

  async copyLink(): Promise<void> {
    this.copied = true;
    this.clipboardApi.copyFromContent('blog.berkefiliz.com' + this.router.url);
    await new Promise((f) => setTimeout(f, 2000));
    this.copied = false;
  }
}
