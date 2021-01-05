import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { Observable, of } from 'rxjs';
import { IUserResponse } from 'src/app/shared/models/UserResponse';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  currentUser$: Observable<IUserResponse>;
  constructor(private accountService: AccountService) {
    this.currentUser$ = this.accountService.currentUser$;
  }

  ngOnInit(): void {}
  logout() {
    this.accountService.logout();
  }
}
