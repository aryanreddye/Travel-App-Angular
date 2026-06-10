import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db} from '../firebase';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule, MatIconModule, MatSnackBarModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  auth = auth;
  db = db;

  constructor(
  private snackBar: MatSnackBar,
  private router: Router,
  private userService: UserService
) {}

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

  this.emailvalidation();
  this.passwordvalidation();

  if (this.emailError === "" && this.passwordError === "") {

    signInWithEmailAndPassword(
      this.auth,
      this.email,
      this.password
    )

    .then((userCredential) => {
      console.log(userCredential);
      console.log(userCredential.user.uid);

      this.userService.setUserData({
        email: this.email
      });

      this.router.navigate(['/dashboard']);

      this.snackBar.open(
        'Login Successful',
        'Close',
        { duration: 3000 }
      );

      console.log(userCredential.user);

    })

    .catch((error) => {

      this.snackBar.open(
        error.message,
        'Close',
        { duration: 5000 }
      );

    });

  }
}

  emailvalidation() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  this.emailError = "";

  if (this.email == "") {
    this.emailError = "Fields cannot be empty";
  }
  else if (!emailPattern.test(this.email)) {
    this.emailError = "Invalid email format";
  }
  else {
    this.emailError = "";
  }
}

  passwordvalidation(){
    const passwordPattern =/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    this.passwordError = "";

    if (this.password == "") {
      this.passwordError = "Fields cannot be empty";
    }
    else if (!passwordPattern.test(this.password)) {
      this.passwordError =
        "Password must contain uppercase, number and special character";
    }
    else {
    this.passwordError = "";
  }
  }


  namevalidation() {

  this.nameError = "";

  if (this.name == "") {
    this.nameError = "Name cannot be empty";
  }

}

phonevalidation() {

  const phonePattern = /^[0-9]{10}$/;

  this.phoneError = "";

  if (this.phone == "") {
    this.phoneError = "Phone cannot be empty";
  }

  else if (!phonePattern.test(this.phone)) {
    this.phoneError = "Phone must contain exactly 10 digits";
  }

}

signupemailvalidation() {

  const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;

  this.signupEmailError = "";

  if (this.signupEmail == "") {
    this.signupEmailError = "Email cannot be empty";
  }

  else if (!emailPattern.test(this.signupEmail)) {
    this.signupEmailError = "Invalid email format";
  }

}

signuppasswordvalidation() {

  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  this.signupPasswordError = "";

  if (this.signupPassword == "") {
    this.signupPasswordError = "Password cannot be empty";
  }

  else if (!passwordPattern.test(this.signupPassword)) {

    this.signupPasswordError =
      "Password must contain uppercase, number and special character";

  }

}


 signup() {

  this.namevalidation();
  this.phonevalidation();
  this.signupemailvalidation();
  this.signuppasswordvalidation();

  if (
    this.nameError === "" &&
    this.phoneError === "" &&
    this.signupEmailError === "" &&
    this.signupPasswordError === ""
  ) {

    createUserWithEmailAndPassword(
      this.auth,
      this.signupEmail,
      this.signupPassword
    )

    .then(async (userCredential) => {

  const uid = userCredential.user.uid;

  console.log(uid);

  await setDoc(
    doc(this.db, 'users', uid),
    {
      name: this.name,
      phone: this.phone,
      email: this.signupEmail
    }
  );

  console.log('User data stored in Firestore');

  this.userService.setUserData({
    name: this.name,
    phone: this.phone,
    email: this.signupEmail
  });

      this.router.navigate(['/dashboard']);

      this.snackBar.open(
        'Signup Successful',
        'Close',
        { duration: 3000 }
      );

      console.log(userCredential.user);

    })

    .catch((error) => {

      this.snackBar.open(
        error.message,
        'Close',
        { duration: 5000 }
      );

    });

  }
}
}