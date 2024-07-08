import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'CookBook';

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
