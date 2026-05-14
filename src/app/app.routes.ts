import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'provider/:id',
    loadComponent: () => import('./pages/provider-detail/provider-detail.component').then(m => m.ProviderDetailComponent)
  },
  {
    path: 'booking/time',
    loadComponent: () => import('./pages/select-time/select-time.component').then(m => m.SelectTimeComponent)
  },
  {
    path: 'booking/confirm',
    loadComponent: () => import('./pages/confirm-details/confirm-details.component').then(m => m.ConfirmDetailsComponent)
  },
  {
    path: 'booking/complete',
    loadComponent: () => import('./pages/complete/complete.component').then(m => m.CompleteComponent)
  },
  {
    path: 'portal',
    loadComponent: () => import('./pages/patient-portal/patient-portal.component').then(m => m.PatientPortalComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
