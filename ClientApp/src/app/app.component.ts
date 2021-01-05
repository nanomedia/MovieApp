import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private accountService: AccountService) {}
  ngOnInit(){
    this.loadCurrentUSer();
  }
  loadCurrentUSer() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      this.accountService.loadCurrentUser(sessionId).subscribe(
        (user) => {
          console.log(user);
          console.log('user loaded');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
