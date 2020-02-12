import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
   {
     path: 'tabs',
     component: TabsPage,
     children: [
       { path: '', redirectTo: 'tabs/quiz/index', pathMatch: 'full' },

       {
         path: 'quiz/index',
         loadChildren: () =>
           import('../quiz/index/index.module').then(m => m.IndexPageModule)
       },
       {
         path: 'results/index',
         loadChildren: () =>
           import('../results/index/index.module').then(m => m.IndexPageModule)
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
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
