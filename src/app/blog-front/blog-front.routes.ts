import { Routes } from '@angular/router';
import { BlogFrontLayoutComponent } from './layouts/blog-front-layout/blog-front-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const blogFrontroutes: Routes = [
    {
        path: '',
        component: BlogFrontLayoutComponent,
        children: [
            {
                path: '',
                component: LandingPageComponent,
            },
            {
                path: 'profile',
                component: ProfilePageComponent,
            },
            {
                path: 'post/:slug',
                component: PostPageComponent,
            },
            {
                path: '**',
                component: NotFoundPageComponent,
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
    }
];

export default blogFrontroutes;