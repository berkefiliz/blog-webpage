import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  faAsterisk,
  faShareNodes,
  faBackward,
} from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard';
import { Router } from '@angular/router';
import { GrabberService } from '../grabber.service';

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
    private gs: GrabberService
  ) {}

  copied: boolean = false;
  file: any;
  text: any;

  // Icons
  faBackward = faBackward;
  faShareNodes = faShareNodes;
  faAsterisk = faAsterisk;

  // Content
  POST: string[] = ["...", "Loading...", "...", ""];

  ngOnInit(): void {
    this.gs.getData().subscribe(d => {
      let POSTS = d.values;
        this.route.queryParams.subscribe((params) => {
          if (params['title']) {
            let title = params['title'].split("_").join(" ")
            let filtered: any = POSTS.filter(function (p: any) {
              return p[1] == title;
            });
            this.POST = filtered.length > 0 ? filtered[0] : ["N/A", "Post not found!", "N/A", "<p>This post does not seem to exist. Maybe the link was incorrect? Or maybe it got deleted by the time you clicked the link? The world is indeed full of wonders...</p>"];
          } else {
            // Page not found
          }
        });
    })
  }

  async copyLink(): Promise<void> {
    this.copied = true;
    this.clipboardApi.copyFromContent('blog.berkefiliz.com/#' + this.router.url);
    await new Promise((f) => setTimeout(f, 2000));
    this.copied = false;
  }
}
