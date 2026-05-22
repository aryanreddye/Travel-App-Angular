import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';

  emailError = "";
passwordError = "";

login() {

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  this.emailError = "";
  this.passwordError = "";

  if (this.email == "" || this.password == "") {
    this.emailError = "empty";
    this.passwordError = "empty";
  }

  else if (!emailPattern.test(this.email)) {
    this.emailError = "Invalid email format";
  }

  else if (!passwordPattern.test(this.password)) {
    this.passwordError = "Password must have 1 uppercase, 1 number, 1 special character";
  }

  else {
    this.emailError = "";
    this.passwordError = "";
    alert("Login Successful!");
  }
}}