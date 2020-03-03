import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'quiz/index', pathMatch: 'full' },

      {
        path: 'quiz/index',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../quiz/index/index.module').then(m => m.IndexPageModule)
          }
        ]
      },
      {
        path: 'results/index',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../results/index/index.module').then(m => m.IndexPageModule)
          }
        ]
      },
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../stats/stats.module').then(m => m.StatsPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/quiz/index',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'tabs',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
