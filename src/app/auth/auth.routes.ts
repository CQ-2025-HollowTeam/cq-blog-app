import { Routes } from '@angular/router';

export const authroutes: Routes = [
    {
        path: '**',
        redirectTo: '/',
    },
];

export default authroutes;
