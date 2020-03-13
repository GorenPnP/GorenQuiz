import { NgModule } from '@angular/core';
import { AccordeonItemComponent } from './accordeon-item/accordeon-item.component';

import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StatItemComponent } from './stat-item/stat-item.component';
import { FullHeaderComponent } from './full-header/full-header.component';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { FileItemsComponent } from './file-items/file-items.component';

@NgModule({
  declarations: [
    AccordeonItemComponent,
    BasicHeaderComponent,
    FullHeaderComponent,
    StatItemComponent,
    FileItemsComponent
  ],
  imports: [
    IonicModule,
    PipesModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AccordeonItemComponent,
    BasicHeaderComponent,
    FullHeaderComponent,
    StatItemComponent,
    FileItemsComponent
  ]
})

export class ComponentsModule { }
