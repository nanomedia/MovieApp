import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({});
  returnUrl: string = '';

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  isInValidField(strField: string): boolean {
    const field = this.loginForm.get(strField);

    return (field && field.invalid && field.touched) || false;
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(
      () => {
        this.accountService.UrlToRedirect('movies');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
