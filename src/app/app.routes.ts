import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

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
        path: 'profile',
        // TODO: añadir guard de autenticación
        component: ProfileComponent,
    },
    {
        path: '',
        loadChildren: () => import('./blog-front/blog-front.routes'),
    },
];
