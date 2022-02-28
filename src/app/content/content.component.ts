import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  faAsterisk,
  faShareNodes,
  faBackward,
} from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

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
    private clipboardApi: ClipboardService,
    private http: HttpClient
  ) {}

  post_title: string = '';
  POSTS: any[] = [];
  copied: boolean = false;
  file: any;
  text: any;

  // Icons
  faBackward = faBackward;
  faShareNodes = faShareNodes;
  faAsterisk = faAsterisk;

  ngOnInit(): void {
    this.scrape();
  }

  findPostByTitle(title: string): any {
    console.log(title);
    let filtered: any = this.POSTS.filter(function (p) {
      return p[1] == title;
    });
    console.log(filtered[0]);
    return filtered.length > 0 ? filtered[0] : ["N/A", "Loading...", "N/A", "<p>...</p>"];
  }

  async copyLink(): Promise<void> {
    this.copied = true;
    this.clipboardApi.copyFromContent('blog.berkefiliz.com' + this.router.url);
    await new Promise((f) => setTimeout(f, 2000));
    this.copied = false;
  }

  // Sheets
  DATA: any = [];
  key: string = 'AIzaSyCsEGooDtecE6HPO1DEYkOM64RjOwAEhnc';
  doc: string = '1qrjyOGaC_g5yykFi9kGYoh0gTaQO4KNQ2zBLxtwOj-g';
  sht: string = 'Posts';
  rng: string = 'A:D';

  async scrape() {
    this.http
      .get<any>(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.doc}/values/${this.sht}!${this.rng}?key=${this.key}`
      )
      .subscribe((data) => {
        this.POSTS = data.values;
        console.log(this.POSTS);

        this.route.queryParams.subscribe((params) => {
          let error = 'Post not found!';
          if (params['title']) {
            this.post_title = params['title'].split('_').join(' ');
          } else {
            {
              this.post_title = error;
            }
          }
        });
      });
  }
}
