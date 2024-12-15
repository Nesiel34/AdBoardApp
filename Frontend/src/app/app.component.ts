import { Component } from '@angular/core';
import { AdsListComponent } from './ads/components/ads-list/ads-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
