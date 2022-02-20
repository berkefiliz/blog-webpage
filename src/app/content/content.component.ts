import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post, POST_DATABASE } from '../post-directory';
import { TEXTS_RAW } from './posts';

import { faBackward, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss', '../app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private clipboardApi: ClipboardService
  ) {}

  post_title: any;
  TEXTS: any;
  copied: boolean = false;

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

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async copyLink(): Promise<void> {
    this.copied = true;
    this.clipboardApi.copyFromContent(
      'http://blog.berkefiliz.com/post?title=' + encodeURI(this.post_title)
    );
    await new Promise(f => setTimeout(f, 2000));
    this.copied = false;
  }
}
