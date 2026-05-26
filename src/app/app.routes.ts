import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './profile/profile';
import { Booking } from './booking/booking';

export const routes: Routes = [

  { path: '', component: Login },

  { path: 'dashboard', component: Dashboard },

  { path: 'profile', component: Profile },

  { path: 'booking/:type', component: Booking }

];