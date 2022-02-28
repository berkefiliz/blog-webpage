import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrabberService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.scrape();
  }

  // Sheets
  DATA: any = [];
  key: string = 'AIzaSyCsEGooDtecE6HPO1DEYkOM64RjOwAEhnc';
  doc: string = '1qrjyOGaC_g5yykFi9kGYoh0gTaQO4KNQ2zBLxtwOj-g';
  sht: string = 'Posts';
  rng: string = 'A:D';

  scrape() {
    this.http
      .get<any>(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.doc}/values/${this.sht}!${this.rng}?key=${this.key}`
      )
      .subscribe((data) => {
        this.DATA = data.values;
      });
  }

  getData(): Observable<any> | any {
    setTimeout(() => {
      console.log("hey")
      if (this.DATA != []) {
        const value = of(this.DATA);
        return value;
      } else {
        return this.getData()
      }
    }, 1000);
  }
}
