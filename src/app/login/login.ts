import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  signupEmail: string = '';
  signupPassword: string = '';

  emailError = "";
  passwordError = "";
  nameError = "";
  phoneError = "";
  signupEmailError = "";
  signupPasswordError = "";
  isLoginForm = true;

  showLogin() {
    this.isLoginForm = true;
  }

  showSignup() {
    this.isLoginForm = false;
  }

  login() {

    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
    const passwordPattern =/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    this.emailError = "";
    this.passwordError = "";

    if (this.email == "" || this.password == "") {
      this.emailError = "Fields cannot be empty";
      this.passwordError = "Fields cannot be empty";
    }
    else if (!emailPattern.test(this.email)) {
      this.emailError = "Invalid email format";
    }
    else if (!passwordPattern.test(this.password)) {
      this.passwordError =
        "Password must contain uppercase, number and special character";
    }
    else {
      alert("Login Successful!");
    }
  }
  signup() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    const phonePattern = /^[0-9]{10}$/;
    this.nameError = "";
    this.phoneError = "";
    this.signupEmailError = "";
    this.signupPasswordError = "";

    if (this.name == "" || this.phone == "" || this.signupEmail == "" || this.signupPassword == "")
    {
      this.nameError = "Fields cannot be empty";
      this.phoneError = "Fields cannot be empty";
      this.signupEmailError = "Fields cannot be empty";
      this.signupPasswordError = "Fields cannot be empty";
    }
    else if (!phonePattern.test(this.phone)) {
      this.phoneError = "Phone number must contain exactly 10 digits";
    }
    else if (!emailPattern.test(this.signupEmail)) {
      this.signupEmailError = "Invalid email format";
    }

    else if (!passwordPattern.test(this.signupPassword)) {
      this.signupPasswordError = "Password must contain uppercase, number and special character";
    }
    else {
      alert("Signup Successful!");
    }
  }
}