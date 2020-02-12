import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailCodePage } from './email-code.page';

describe('EmailCodePage', () => {
  let component: EmailCodePage;
  let fixture: ComponentFixture<EmailCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
