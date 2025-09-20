import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
    },
    {
        path: '',
        loadChildren: () => import('./blog-front/blog-front.routes'),
    },
];
