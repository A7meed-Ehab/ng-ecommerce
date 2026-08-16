import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBlankComponent } from "./Components/nav-blank/nav-blank.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBlankComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerce';
}
