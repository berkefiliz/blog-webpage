import { Component, OnInit } from '@angular/core';
import { GrabberService } from '../grabber.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  LANGUAGES: string[] = ['EN', 'TR'];
  f_language = new FormControl();
  TYPES: string[] = ['discussion', 'story', 'poem'];
  f_type = new FormControl();

  ngOnInit(): void {
    this.gs.getData().subscribe((d) => {
      this.POSTS = d.values;
    });
    this.loadFilters();
  }

  saveFilters() {
    localStorage.setItem('f_language', this.f_language.value);
    localStorage.setItem('f_type', this.f_type.value);
  }

  loadFilters() {
    let f_l = localStorage.getItem('f_language');
    this.f_language.setValue(f_l ? f_l.split(',') : []);
    let f_t = localStorage.getItem('f_type');
    this.f_type.setValue(f_t ? f_t.split(',') : []);
  }

  filterPosts() {
    let lang = this.f_language.value;
    lang = lang && lang.length > 0 ? lang : this.LANGUAGES;
    let typ = this.f_type.value;
    typ = typ && typ.length > 0 ? typ : this.TYPES;
    if (this.POSTS.length < 1) {
      return [];
    }
    return this.POSTS.filter((post) => lang.indexOf(post[2].slice(-2)) > -1 && typ.indexOf(post[2].slice(0,-3)) > -1);
  }

  make_url(input: string): string {
    return input.split(' ').join('_');
  }

  make_taglist(tags: string): string {
    return tags.split(',').join(' ⚹ ');
  }

  refreshPage() {
    window.location.reload();
  }
}
