import { Component, signal } from '@angular/core';
import { TimelineCmsComponent } from './timeline-cms/timeline-cms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimelineCmsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-project-sample');
}
