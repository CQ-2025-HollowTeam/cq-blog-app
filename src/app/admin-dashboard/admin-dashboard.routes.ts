import { Routes } from '@angular/router';
import { AdminDashboardLayoutComponent } from './layouts/admin-dashboard-layout/admin-dashboard-layout.component';
import { PostsAdminPageComponent } from './pages/posts-admin-page/posts-admin-page.component';
import { PostAdminPageComponent } from './pages/post-admin-page/post-admin-page.component';

export const adminDashboardroutes: Routes = [
    {
        path: '',
        component: AdminDashboardLayoutComponent,
        children: [
            {
                path: 'posts',
                component: PostsAdminPageComponent,
            }, 
            {
                path: 'post/:id',
                component: PostAdminPageComponent,
            },
            {
                path: '**',
                redirectTo: 'posts',
            }
        ]
    }
];

export default adminDashboardroutes;