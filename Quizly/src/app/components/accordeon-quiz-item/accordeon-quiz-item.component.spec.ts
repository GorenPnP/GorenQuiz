import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccordeonQuestionItemComponent } from './accordeon-question-item.component';

describe('AccordeonQuestionItemComponent', () => {
  let component: AccordeonQuestionItemComponent;
  let fixture: ComponentFixture<AccordeonQuestionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordeonQuestionItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordeonQuestionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
