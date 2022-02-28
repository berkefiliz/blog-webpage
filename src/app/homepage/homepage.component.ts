import { Component, OnInit } from '@angular/core';
import { GrabberService } from '../grabber.service';

import { faRefresh } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../app.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private gs: GrabberService) {}

  POSTS: string[] = [];
  faRefresh = faRefresh;

  ngOnInit(): void {
    this.gs.getData().subscribe(d => {
      this.POSTS = d.values;
    })
  }

  make_url(input: string): string {
    return input.split(" ").join("_")
  }

  make_taglist(tags: string): string {
    return tags.split(",").join(" ⚹ ") 
  }

  refreshPage() {
    window.location.reload();
  }
}
