import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = {
    name: '',
    email: '',
    phone: '',
    memberSince: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long' }),
    accountTier: 'Premium Member'
  };

  setUserData(data: any): void {
    this.userData = {
      ...this.userData,
      ...data,
      memberSince: this.userData.memberSince
    };
  }

  getUserData(): any {
    return this.userData;
  }

  clearUserData(): void {
    this.userData = {
      name: '',
      email: '',
      phone: '',
      memberSince: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long' }),
      accountTier: 'Premium Member'
    };
  }
}
