import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'results/detail/:id',
    loadChildren: () =>
      import('./results/detail/detail.module').then(
        m => m.DetailPageModule
      )
  },
  {
    path: 'quiz/detail',
    loadChildren: () =>
      import('./quiz/detail/detail.module').then(
        m => m.DetailPageModule
      )
  },
  {
    path: 'quiz/end',
    loadChildren: () =>
      import('./quiz/end/end.module').then(m => m.EndPageModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then( m => m.StatsPageModule)
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
