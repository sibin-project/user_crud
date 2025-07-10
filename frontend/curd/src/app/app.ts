import { Component } from '@angular/core';
import { Curd } from './pages/curd/curd';

@Component({
  selector: 'app-root',
  imports: [Curd],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'curd';
}
