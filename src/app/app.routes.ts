import { Routes } from '@angular/router';
import { isAdminGuard } from '@auth/guards/is-admin.guard';
import { NotAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [
    {
        path: 'oauth',
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
        canMatch: [
            isAdminGuard,
        ]
    },
    {
        path: '',
        loadChildren: () => import('./blog-front/blog-front.routes'),
    },
];
