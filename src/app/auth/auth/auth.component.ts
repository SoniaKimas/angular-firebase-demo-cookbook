import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable, Subscription} from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  isLoading = false;

  error : string = null;

  authForm: FormGroup;

  // @ViewChild('containerRef', { read: ViewContainerRef}) containerRef: ViewContainerRef;

  private closeSub: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }



  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl('',
        [
          Validators.required,
          //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'),
          Validators.minLength(8),
          Validators.maxLength(20)

        ])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) { return; } //because user in frontend can use developer tools to bypass the form validation

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }else {
      authObs = this.authService.signup(email, password);
    }

    this.closeSub =  authObs.subscribe(
      {
        next: resData => {
          console.log(resData);
          this.isLoading = false;
          console.log('redirecting');
          this.router.navigate(['/recipes']);
        },
        error: error => {
          console.log(error);
          this.error = error; //this is for using display error using if in the template
          //this.showErrorAlert(error); //this is for dispaying error programatically
          this.isLoading = false;
        }
      });

    console.log(this.authForm.value);

    this.authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  // private showErrorAlert(message: string) {
  //   this.containerRef.clear();
  //   const componentRef = this.containerRef.createComponent(AlertComponent);
  //   componentRef.instance.message = message;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     this.containerRef.clear();
  //   });
  // }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}

