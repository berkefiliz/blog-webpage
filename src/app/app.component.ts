import { Component, OnInit } from '@angular/core';
import { GrabberService } from './grabber.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blog';

  constructor(private gs: GrabberService) {}

  ngOnInit(): void {
    this.gs.scrape().subscribe((d) => {
      // Done
    });
  }
}
