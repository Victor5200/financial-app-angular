import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('financeiro-app');

  constructor(public router: Router) {
  }
}
