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

  copied: boolean = false;
  file: any;
  text: any;

  // Icons
  faBackward = faBackward;
  faShareNodes = faShareNodes;
  faAsterisk = faAsterisk;

  // Content
  POST: string[] = ["N/A", "Loading...", "N/A", "<p>...</p>"];

  ngOnInit(): void {
    this.scrape();
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
        let POSTS = data.values;
        this.route.queryParams.subscribe((params) => {
          if (params['title']) {
            let title = params['title'].split("_").join(" ")
            let filtered: any = POSTS.filter(function (p: any) {
              return p[1] == title;
            });
            this.POST = filtered.length > 0 ? filtered[0] : ["N/A", "Loading...", "N/A", "<p>...</p>"];
          } else {
            // Page not found
          }
        });
      });
  }
}
