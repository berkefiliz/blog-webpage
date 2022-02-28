import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../app.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private http: HttpClient) {}

  POSTS: any = [];

  ngOnInit(): void {
    this.scrape()
  }

  make_url(input: string): string {
    return input.split(" ").join("_")
  }

  make_taglist(tags: string): string {
    return tags.split(",").join(" ⚹ ") 
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
        console.log(this.POSTS)
      });
  }
}
