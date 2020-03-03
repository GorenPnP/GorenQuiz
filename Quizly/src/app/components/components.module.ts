import { NgModule } from '@angular/core';
import { AccordeonQuizItemComponent } from './accordeon-quiz-item/accordeon-quiz-item.component';
import { AccordeonResultsItemComponent } from './accordeon-results-item/accordeon-results-item.component';

import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StatItemComponent } from './stat-item/stat-item.component';

@NgModule({
  declarations: [AccordeonQuizItemComponent, AccordeonResultsItemComponent, StatItemComponent],
  imports: [IonicModule, PipesModule, CommonModule, RouterModule, FormsModule],
  exports: [AccordeonQuizItemComponent, AccordeonResultsItemComponent, StatItemComponent]
})

export class ComponentsModule { }
