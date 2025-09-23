import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [
    {
        path: 'oauth',
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
