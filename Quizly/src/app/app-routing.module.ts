import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'prefix' },
  {
    path: 'login',
    loadChildren: () =>
      import('./public/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./public/signin/signin.module').then(m => m.SigninPageModule)
  },

  {
    path: 'email-code',
    loadChildren: () => import('./public/email-code/email-code.module').then( m => m.EmailCodePageModule)
  },
  {
    path: 'creators',
    loadChildren: () =>
      import('./public/creators/creators.module').then(
        m => m.CreatorsPageModule
      )
  },
  {
    path: 'members',
    canActivate: [AuthGuard],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
