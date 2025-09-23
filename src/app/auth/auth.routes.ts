import { Routes } from '@angular/router';
import { OauthPageComponent } from './pages/oauth-page/oauth-page.component';

export const authroutes: Routes = [
    {
        path: ':token',
        component: OauthPageComponent,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

export default authroutes;
