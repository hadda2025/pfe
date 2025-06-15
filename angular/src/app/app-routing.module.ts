// Angular Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Project Components
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  // Redirection par défaut vers la page de login
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full'
  },
  // Routes de type "Guest" (non authentifiées)
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signin',
        loadComponent: () =>
          import('./demo/pages/authentication/sign-in/sign-in.component').then(m => m.default)
      },
      {
        path: 'auth/reset',
        loadComponent: () =>
          import('./demo/pages/authentication/update-password/update-password.component').then(m => m.default)
      }
    ]
  },
  // Routes de type "Admin" (authentifiées)
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'analytics',
        loadComponent: () =>
          import('./demo/dashboard/dash-analytics.component').then(m => m.default)
      },
      {
        path: 'component',
        loadChildren: () =>
          import('./demo/ui-element/ui-basic.module').then(m => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () =>
          import('./demo/chart-maps/core-apex.component').then(m => m.default)
      },
      {
        path: 'forms',
        loadComponent: () =>
          import('./demo/forms/form-elements/form-elements.component').then(m => m.default)
      },
      {
        path: 'tables',
        loadComponent: () =>
          import('./demo/tables/tbl-bootstrap/tbl-bootstrap.component').then(m => m.default)
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/other/sample-page/sample-page.component').then(m => m.default)
      }
    ]
  },
  // Redirection pour toute route inconnue
  {
    path: '**',
    redirectTo: 'auth/signin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
