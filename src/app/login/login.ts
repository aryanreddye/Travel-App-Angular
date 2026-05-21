import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';

  login() {
    console.log("Login clicked");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (this.email == "" || this.password == ""){
      alert("EMpty");
    }
    else if (!emailPattern.test(this.email)) {
    console.log("invalid email formt");
    }
    else if (!passwordPattern.test(this.password)){
      console.log("invalid password")
    }
  
    else{
    console.log("Email:", this.email);
    console.log("Password:", this.password);
  }}
}