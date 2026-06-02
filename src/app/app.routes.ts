import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './profile/profile';
import { Booking } from './booking/booking';
import { Payment } from './payment/payment';
import { Orders } from './orders/orders';

export const routes: Routes = [

  { path: '', component: Login },

  { path: 'dashboard', component: Dashboard },

  { path: 'profile', component: Profile },

  { path: 'orders', component: Orders },

  { path: 'booking/:type', component: Booking },

  { path: 'payment', component: Payment }

];